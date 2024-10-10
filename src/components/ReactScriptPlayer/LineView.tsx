'use client';

/* eslint-disable react/button-has-type */
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LanguageCode, Subtitle } from '../../types/Scripts';
// import { useState } from 'react';
import { TextDisplay } from './TextDisplay';

interface LineViewProps {
  subtitles: Subtitle[];
  selectedLanguages: LanguageCode[];
  currentSubtitleIndex: number;
  seekTo: (timeInSeconds: number) => void;
  onSelectWord: (word: string, subtitle: Subtitle, index: number) => void;
}

export function LineView({
  subtitles,
  selectedLanguages,
  currentSubtitleIndex,
  seekTo,
  onSelectWord,
}: LineViewProps) {
  // const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0);
  const totalSubtitles = subtitles.length;

  const handlePrevious = () => {
    if (currentSubtitleIndex > 0) {
      seekTo(subtitles[currentSubtitleIndex - 1].startTimeInSecond);
      // setCurrentSubtitleIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentSubtitleIndex < totalSubtitles - 1) {
      seekTo(subtitles[currentSubtitleIndex + 1].startTimeInSecond);
      // setCurrentSubtitleIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="self-end">
        <button onClick={handlePrevious} className="cursor-pointer">
          <ChevronLeft />
        </button>
        <button onClick={handleNext} className="cursor-pointer">
          <ChevronRight />
        </button>
      </div>

      {/* TextDisplay에서 현재 자막과 선택된 언어를 표시 */}
      {subtitles[currentSubtitleIndex] && (
        // TODO(@smosco):사용자가 자막이 언제 넘어갈지 알 수 있도록 progressbar 추가
        <TextDisplay
          subtitle={subtitles[currentSubtitleIndex]}
          selectedLanguages={selectedLanguages}
          onSelectWord={onSelectWord}
        />
      )}
    </div>
  );
}
