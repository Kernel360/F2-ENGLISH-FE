import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface Quiz {
  id: number;
  question: string;
  answer: string;
}

interface QuizProps {
  data: Quiz;
}
export default function Quiz({ data }: QuizProps) {
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [remainingWords, setRemainingWords] = useState<string[]>([]);

  useEffect(() => {
    setRemainingWords(
      data.answer.split(' ').sort(() => (Math.random() > 0.5 ? 1 : -1)),
    );
  }, [data]);

  const handleClickSelect = useCallback((word: string) => {
    setSelectedWords((prev) => [...prev, word]);
    setRemainingWords((prev) =>
      prev.filter((existingWord) => existingWord !== word),
    );
  }, []);

  const handleClickUnselect = useCallback((word: string) => {
    setRemainingWords((prev) => [...prev, word]);
    setSelectedWords((prev) =>
      prev.filter((existingWord) => existingWord !== word),
    );
  }, []);

  const handleClickSubmit = useCallback(() => {
    const submittedAnswer = selectedWords.join(' ');
    const isCorrect = submittedAnswer === data.answer;
    if (isCorrect) {
      alert('정답입니다!');
    } else {
      alert('오답입니다');
    }
    // TODO(@smosco): eslint 룰 체크
    // react-hooks/exhaustive-deps
  }, [selectedWords]);

  return (
    <div className="flex flex-col gap-2 w-full p-10 border">
      <p>{data.question}</p>

      <div className="flex flex-wrap gap-2 border-b h-8">
        {selectedWords.map((word, index) => (
          <Button
            key={index}
            variant={'ghost'}
            size="sm"
            onClick={() => handleClickUnselect(word)}
          >
            {word}
          </Button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 h-8">
        {remainingWords.map((word, index) => (
          <Button
            key={index}
            variant={'outline'}
            size="sm"
            onClick={() => handleClickSelect(word)}
          >
            {word}
          </Button>
        ))}
      </div>

      <Button onClick={handleClickSubmit}>제출</Button>
    </div>
  );
}
