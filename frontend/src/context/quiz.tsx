import React, { createContext, useContext, useState } from "react";
import type { QuizData } from "../pages/Quiz";

interface QuizContextType {
  quiz: QuizData | null;
  setQuiz: React.Dispatch<React.SetStateAction<QuizData | null>>;

}

interface QuizProviderProps {
  children: React.ReactNode
}


export const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<QuizProviderProps> = ({ children }) => {
  const [quiz, setQuiz] = useState<QuizData | null>(null);

  const value: QuizContextType = { quiz, setQuiz };

  return <QuizContext.Provider value={value}>

    {children}

  </QuizContext.Provider>


}

export const useQuiz = (): QuizContextType => {
  const context = useContext(QuizContext);
  if (!context) {
    throw Error("use QuizContext must be used within a QuizProvider ");

  }
  return context;

}








