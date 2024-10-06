import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CircleCheck, CircleX } from 'lucide-react';
import { shuffleArray } from '@/lib/utils';

interface QuizData {
  id: number;
  question: string;
  answer: string;
}

interface QuizProps {
  data: QuizData;
  onNext?: () => void;
}
export default function Quiz({ data, onNext }: QuizProps) {
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [remainingWords, setRemainingWords] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    setSelectedWords([]);
    setRemainingWords(shuffleArray(data.answer.split(' ')));
    setIsCorrect(null);
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
    setIsCorrect(submittedAnswer === data.answer);

    if (onNext) {
      setTimeout(() => {
        onNext();
      }, 500);
    }
  }, [selectedWords, data.answer, onNext]);

  return (
    <div className="flex flex-col gap-4 w-full p-10 border h-100">
      <p>{data.question}</p>

      {/* 선택된 단어 표시 */}
      <div className="flex flex-wrap gap-2 border-b h-8">
        {selectedWords.map((word, index) => (
          <Button
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            variant="ghost"
            size="sm"
            onClick={() => handleClickUnselect(word)}
          >
            {word}
          </Button>
        ))}
      </div>

      {/* 남은 단어 표시 */}
      <div className="flex flex-wrap gap-2 h-8">
        {remainingWords.map((word, index) => (
          <Button
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            variant="outline"
            size="sm"
            onClick={() => handleClickSelect(word)}
          >
            {word}
          </Button>
        ))}
      </div>

      {/* 정답/오답 여부 표시 */}
      <div className="flex h-12">
        {isCorrect !== null && (
          <div className={`${isCorrect !== null ? 'visible' : 'hidden'}`}>
            {isCorrect ? (
              <div className="flex">
                <CircleCheck color="green" />
                <p className="text-green-600 font-bold ml-1">정답입니다!</p>
              </div>
            ) : (
              <div className="flex flex-col">
                <div className="flex">
                  <CircleX color="red" />
                  <p className="text-red-600 font-bold ml-1">오답입니다</p>
                </div>
                <p className="text-red-600 font-bold">정답 : {data.answer}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 제출 버튼 */}
      <Button className="mt-auto" onClick={handleClickSubmit}>
        제출
      </Button>
    </div>
  );
}
