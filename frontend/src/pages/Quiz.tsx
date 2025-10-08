
import React, { useState } from "react";
import axios from "axios";
import { useQuiz } from "../context/quiz";
import { useNavigate } from "react-router";



interface Option {
  option_id: number;
  option: string;
}

interface Question {
  question_id: number;
  question: string;
  quiz_id: number;
  options: Option[];
}

export interface QuizData {
  quiz_id: number;
  created_at: string;
  title: string;
  questions: Question[];
}

// Track user answers
type UserAnswer = {
  question_id: number;
  select_id: number;

};

type ResultType = {
  total: number;
  score: number;
}

const Quiz: React.FC = () => {
  const { quiz } = useQuiz();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]); // store selected answers
  const [result, setResult] = useState<ResultType | null>(null);
  const [quizInProgress, setQuizInProgress] = useState<boolean>(true);

  const navigate = useNavigate();

  // Fetch quiz from backend
  const GetQuiz = async () => {

    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setResult(null);
    setQuizInProgress(true);
  };

  // Handle option selection
  const selectOption = (questionId: number, optionId: number) => {
    setUserAnswers((prev) => {
      const updated = prev.filter((a) => a.question_id != questionId);
      return [...updated, { question_id: questionId, select_id: optionId }]
    });
  };

  // Navigate questions
  const nextQuestion = () => {
    if (quiz && currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const onSubmit = async () => {

    console.log(userAnswers);
    const result = await axios.post("http://localhost:3000/v1/quiz/answers", { array: userAnswers });
    setResult(result.data);
    setQuizInProgress(false);

  }

  const handleAnotherQuiz = () => {
    navigate("/quizes");

  }

  // Current question
  const currentQuestion = quiz?.questions[currentQuestionIndex];

  return (
    <div className="p-5 w-full h-min-screen flex justify-center items-center ">
      <div className="p-3 flex-col w-min-sm  justify-center items-center  ">
        <h1 className="text-xl text-black mb-4">Quiz Page</h1>

        {!quizInProgress && (
          <div className="flex gap-3 ">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded"
              onClick={GetQuiz}
            >
              Attempt Again
            </button>

            <button
              className="bg-blue-500 text-white py-2 px-4 rounded"
              onClick={handleAnotherQuiz}
            >
              Try Some Other Quiz
            </button>



          </div>

        )}

        {quiz && quizInProgress && currentQuestion && (
          <div className="mt-4">
            <h2 className="text-lg font-bold">{quiz.title}</h2>

            <div className="mb-4 flex flex-col justify-center items-center ">
              <p className="text-xl p-3">
                Question {currentQuestionIndex + 1}: {currentQuestion.question}
              </p>

              <ul>
                {currentQuestion.options.map((opt) => (
                  <li key={opt.option_id}>
                    <button
                      onClick={() => selectOption(currentQuestion.question_id, opt.option_id)}
                      className={`border p-4 m-1 rounded w-full ${userAnswers.some((answer: UserAnswer) => (answer.select_id == opt.option_id && answer.question_id == currentQuestion.question_id))
                        ? "bg-blue-500 text-white"
                        : ""
                        }`}
                    >
                      {opt.option}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4">
              <button
                onClick={prevQuestion}
                disabled={currentQuestionIndex === 0}
                className="bg-gray-300 p-2 rounded"
              >
                Previous
              </button>

              <button
                onClick={nextQuestion}
                disabled={quiz.questions.length === currentQuestionIndex + 1}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Next
              </button>
            </div>
            <button onClick={onSubmit}> Submit </button>
          </div>
        )}

        {result && (

          <div className="flex gap-3 flex-col">

            <div>  {result.total}  </div>
            <div> {result.score}   </div>


          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
