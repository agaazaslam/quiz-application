
import React, { useState } from "react";
import { Progress, } from "@/components/ui/progress.js";
import { Button } from "@/components/ui/button.js";

import axios from "axios";
import { useQuiz } from "../context/quiz";
import { useNavigate } from "react-router";
import type { Option, Question, UserAnswer, ResultType } from "../types/types.jsx"
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.js";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { Label } from "@/components/ui/label.js";


const Quiz: React.FC = () => {
  const { quiz, setQuiz } = useQuiz();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]); // store selected answers
  const [result, setResult] = useState<ResultType | null>(null);
  const [quizInProgress, setQuizInProgress] = useState<boolean>(true);

  const navigate = useNavigate();


  // Handle option selection
  //
  const handleAnswer = (value: string) => {
    const numVal = Number(value);
    setUserAnswers((prev) => {
      const updated = prev.filter((a) => a.question_id != currentQuestion.question_id);
      return [...updated, { question_id: currentQuestion.question_id, select_id: numVal }]


    });
    console.log(currentQuestion.question_id, numVal);
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
    const response = await axios.post("http://localhost:3000/v1/quiz/answers", { array: userAnswers });
    setResult(response.data);
    console.log(response.data)

  }

  const handleAnotherQuiz = () => {
    navigate("/quizes");

  }

  const handleGoBack = () => {
    setQuiz(null);
    navigate("/quizes");
  }

  // Current question
  const currentQuestion = quiz?.questions[currentQuestionIndex];



  return (
    <div className="min-h-screen py-8">

      {result && (<div> Result : {result.score} </div>)}

      {!result && (<div className="  container mx-auto px-4 max-w-4xl">


        {/* Top Bar */}
        <div className="mb-6">
          <Button variant="ghost" className="mb-4" onClick={handleGoBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Quizzes
          </Button>
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-balance">{quiz.title}</h1>
            <span className="text-sm text-muted-foreground">
              Question 1  of 4
            </span>
          </div>
          <Progress value={75} className="h-2" />
        </div>


        {/* Main Question Body  */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl text-balance">
              {currentQuestion.question}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <RadioGroup
              value={
                userAnswers.find(
                  (a) => a.question_id === currentQuestion.question_id
                )?.select_id.toString() || ""
              }
              onValueChange={handleAnswer}
              className="space-y-3"
            >
              {currentQuestion.options.map((option) => {
                const selectedValue =
                  userAnswers.find(
                    (a) => a.question_id === currentQuestion.question_id
                  )?.select_id.toString() || "";

                const isSelected = selectedValue === option.option_id.toString();

                return (
                  <Label
                    key={option.option_id}
                    htmlFor={`option-${option.option_id}`}
                    className={
                      `flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${isSelected
                        ? "border-primary bg-primary/10"
                        : "border-muted hover:border-primary/50"}`}
                  >
                    <RadioGroupItem
                      value={option.option_id.toString()}
                      id={`option-${option.option_id}`}
                    />
                    <span>{option.option}</span>
                  </Label>
                );
              })}
            </RadioGroup>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <div className="flex gap-3">

            <Button variant={"default"} disabled={currentQuestionIndex == 0} onClick={prevQuestion}> Prev Question </Button>
            <Button variant={"default"} disabled={quiz.questions.length - 1 == currentQuestionIndex} onClick={nextQuestion}> Next Question </Button>
          </div>

          <div>
            <Button variant={"destructive"} onClick={onSubmit}> Submit </Button>
          </div>



        </div>

      </div>)}


    </div >
  );
};

export default Quiz;




















