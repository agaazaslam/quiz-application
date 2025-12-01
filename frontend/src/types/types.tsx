
export interface Option {
  option_id: number;
  option: string;
}

export interface Question {
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
export interface UserAnswer {
  question_id: number;
  select_id: number;

};

export interface ResultType {
  total: number;
  score: number;
}


