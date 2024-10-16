import React from 'react';
import { QuestionAnswer } from '@/types/Quiz';
import Carousel from '../Carousel';
import Quiz from './Quiz';

interface QuizCarouselProps {
  quizListData: QuestionAnswer[];
}

export default function QuizCarousel({ quizListData }: QuizCarouselProps) {
  return (
    <div className="w-full">
      <h3>퀴즈 풀기</h3>
      <Carousel
        previewDatas={quizListData}
        itemComponent={Quiz}
        itemWidth={800}
        itemsPerPage={1}
      />
    </div>
  );
}
