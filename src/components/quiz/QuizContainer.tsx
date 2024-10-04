import React, { useState } from 'react';
import Quiz from './Quiz';

interface Word {
  text: string;
  index: number;
}

interface Quiz {
  id: number;
  question: string;
  words: Word[];
  answer: string;
}

interface QuizContainerProps {
  quizListData: Quiz[];
}

export default function QuizContainer({ quizListData }: QuizContainerProps) {
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleAnswerSubmit = (answer: string) => {
    const currentQuestion = quizListData[currentQuizIndex];
    if (answer === currentQuestion.answer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const nextQuestion = () => {
    setIsCorrect(null);
    setCurrentQuizIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div className="w-full p-10 border rounded-lg mb-20">
      {/* 현재 문제에 대한 QuizQuestion 컴포넌트 */}
      {/* <Quiz
        quiz={quizListData[currentQuizIndex]}
        onSubmit={handleAnswerSubmit}
        isCorrect={isCorrect}
      /> */}
    </div>
  );
}
