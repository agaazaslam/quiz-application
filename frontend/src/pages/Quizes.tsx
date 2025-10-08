import axios from "axios";
import { useEffect, useState } from "react"
import type { QuizData } from "./Quiz";
import { useNavigate } from "react-router";
import { useQuiz } from "../context/quiz";

const Quizes = () => {

  const [quizes, setQuizes] = useState<QuizData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { setQuiz } = useQuiz();

  const navigate = useNavigate();

  const selectQuiz = (e: React.MouseEvent<HTMLDivElement>, quiz: QuizData) => {
    e.preventDefault();
    setQuiz(quiz);
    console.log(quiz);
    navigate("/quiz");


  };

  useEffect(
    () => {

      const fetchQuizes = async () => {
        setLoading(true);
        try {

          const response = await axios.get("http://localhost:3000/v1/quizes")
          setQuizes(response.data);
        } catch (error) {
          console.log(error);
        }

        finally {
          setLoading(false);
        }
      }
      fetchQuizes();


    }, []
  );

  return (
    <>

      {loading && (<div> ....Loading </div>)}

      {quizes && (
        <div>
          {quizes.map((quiz, index) => {
            return <div key={index} className="border-2 p-2 border-black" onClick={(e) => selectQuiz(e, quiz)}>
              {quiz.title}
            </div>




          })}








        </div>
      )
      }

    </>
  )
}

export default Quizes
