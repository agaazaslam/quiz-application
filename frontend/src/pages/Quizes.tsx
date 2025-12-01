import axios from "axios";
import { useEffect, useState } from "react"
import type { QuizData } from "./Quiz";
import { useNavigate } from "react-router";
import { useQuiz } from "../context/quiz";
import QuizCard from "@/components/QuizCard";
import { QuizCard1 } from "@/components/QuizCard";
const Quizes = () => {

  const [quizes, setQuizes] = useState<QuizData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { setQuiz } = useQuiz();

  const navigate = useNavigate();

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
        <div className="min-h-[80vh] flex justify-center items-center">
          <div className=" flex flex-wrap  justify-center items-center gap-6 ">
            {quizes.map((quiz) => {

              return <QuizCard1 quiz={quiz} />


            })}

          </div>
        </div>
      )
      }

    </>
  )
}

export default Quizes
