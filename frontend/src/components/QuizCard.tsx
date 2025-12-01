import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import type { QuizData } from "@/pages/Quiz";
import { useQuiz } from "@/context/quiz";
import { useNavigate } from "react-router";
import { QuoteIcon } from "lucide-react";

interface QuizCardProps {
  quiz: QuizData;

}


const QuizCard = ({ quiz }: QuizCardProps) => {

  const { setQuiz } = useQuiz();
  const navigate = useNavigate();

  const selectQuiz = (e: React.MouseEvent<HTMLDivElement>, quiz: QuizData) => {
    e.preventDefault();
    setQuiz(quiz);
    console.log(quiz);
    navigate("/quiz");


  };



  return (
    <Card onClick={(e) => { selectQuiz(e, quiz) }}>
      <CardHeader>
        <CardTitle>{quiz.title}</CardTitle>
        <CardDescription>Card Description</CardDescription>
        <CardAction>Card Action</CardAction>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  )
}


const QuizCard1 = ({ quiz }: QuizCardProps) => {

  const { setQuiz } = useQuiz();
  const navigate = useNavigate();

  const selectQuiz = (e: React.MouseEvent<HTMLDivElement>, quiz: QuizData) => {
    e.preventDefault();
    setQuiz(quiz);
    console.log(quiz);
    navigate("/quiz");


  };


  return (<Card
    className="w-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer border-2 hover:border-primary/50"
    onClick={(e) => selectQuiz(e, quiz)}
  >
    <CardHeader>
      <div className="flex items-start justify-between mb-2">
        <div className="p-3 rounded-lg bg-primary/10">
          <QuoteIcon className="w-6 h-6 text-primary" />
        </div>
        <Badge variant="secondary" className="text-xs">
          {quiz.questions.length} Questions
        </Badge>
      </div>
      <CardTitle className="text-2xl text-balance">{quiz.title}</CardTitle>
      <CardDescription className="text-pretty">Description : Long Description about the quiz </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Difficulty:</span>
          <Badge variant={"default"}
          >
            Medium
          </Badge>
        </div>
        <Button>Start Quiz</Button>
      </div>
    </CardContent>
  </Card >)



}

export { QuizCard1 };
export default QuizCard
