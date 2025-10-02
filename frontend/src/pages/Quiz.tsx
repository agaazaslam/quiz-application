
import React, { useState } from "react";
import axios from "axios";



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

interface QuizData {
  quiz_id: number;
  created_at: string;
  title: string;
  questions: Question[];
}

// Track user answers
type UserAnswers = {
  [questionId: number]: number; // maps question_id => selected option_id
};

const Quiz: React.FC = () => {
  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({}); // store selected answers

  // Fetch quiz from backend
  const GetQuiz = async () => {
    try {
      const response = await axios.get<QuizData>(
        "http://localhost:3000/v1/quiz?quiz_name=first%20quiz"
      );
      setQuiz(response.data);
      setCurrentQuestionIndex(0);
      setUserAnswers({});
    } catch (error) {
      console.error("Error fetching quiz:", error);
    }
  };

  // Handle option selection
  const selectOption = (questionId: number, optionId: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
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

  // Current question
  const currentQuestion = quiz?.questions[currentQuestionIndex];

  return (
    <div className="p-5">
      <h1 className="text-xl text-black mb-4">Quiz Page</h1>

      {!quiz && (
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded"
          onClick={GetQuiz}
        >
          Start Quiz
        </button>
      )}

      {quiz && currentQuestion && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">{quiz.title}</h2>

          <div className="mb-4">
            <p>
              Question {currentQuestionIndex + 1}: {currentQuestion.question}
            </p>

            <ul>
              {currentQuestion.options.map((opt) => (
                <li key={opt.option_id}>
                  <button
                    onClick={() => selectOption(currentQuestion.question_id, opt.option_id)}
                    className={`border p-2 m-1 rounded ${userAnswers[currentQuestion.question_id] === opt.option_id
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
        </div>
      )}
    </div>
  );
};

export default Quiz;
