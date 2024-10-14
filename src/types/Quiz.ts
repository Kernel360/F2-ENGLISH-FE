interface QuestionAnswer {
  question: string;
  answer: string;
}

export interface FetchQuizResponse {
  code: string;
  message: string;
  data: {
    'question-answer': QuestionAnswer[];
  };
}
