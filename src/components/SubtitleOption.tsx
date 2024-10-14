'use client';

import React, { Dispatch, SetStateAction } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { LanguageCode } from '../types/Scripts';

type Mode = 'line' | 'block';

interface SubtitleOptionProps {
  mode: Mode;
  availableLanguages: LanguageCode[]; // 전체 가능한 언어 옵션
  selectedLanguages: LanguageCode[]; // 다중 선택 가능한 언어 배열
  setSelectedLanguages: Dispatch<SetStateAction<LanguageCode[]>>;
  setMode: Dispatch<SetStateAction<Mode>>;
}

// 화면에 표시되는 언어 이름
const languageDisplayNames: Record<LanguageCode, string> = {
  enScript: '영어 자막',
  koScript: '한국어 자막',
};

export default function SubtitleOption({
  mode,
  availableLanguages,
  selectedLanguages,
  setSelectedLanguages,
  setMode,
}: SubtitleOptionProps) {
  const handleLanguageChange = (language: LanguageCode) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(
        selectedLanguages.filter((lang) => lang !== language),
      );
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {/* 모드 선택 버튼 */}
      <div className="flex justify-between">
        <div className="flex w-48 p-1 bg-violet-500 rounded">
          {['line', 'block'].map((item) => (
            <button
              type="button"
              key={item}
              className={`w-1/2 border-none cursor-pointer bg-transparent py-2 text-sm transition-colors duration-300 ease-out ${
                mode === item ? 'bg-white rounded' : 'text-white'
              }`}
              onClick={() => setMode(item as Mode)}
            >
              {item === 'line' ? '한 줄씩 보기' : '전체 보기'}
            </button>
          ))}
        </div>

        {/* 언어 선택 */}
        <div className="flex flex-wrap gap-2">
          {availableLanguages.map((item) => (
            // eslint-disable-next-line jsx-a11y/label-has-associated-control
            <label
              key={item}
              className="items-center gap-2 text-sm flex rounded "
            >
              <ToggleGroup
                type="single"
                value={selectedLanguages.includes(item) ? item : ''}
                onValueChange={() => handleLanguageChange(item)}
              >
                <ToggleGroupItem
                  value={item}
                  className={`flex  items-center justify-center bg-gray-200 text-gray-500
                  last:rounded-r hover:bg-violet-200 hover:text-violet-800   data-[state=on]:bg-violet-500 data-[state=on]:text-white
                 s${selectedLanguages.includes(item)}`}
                >
                  {languageDisplayNames[item]}
                </ToggleGroupItem>
              </ToggleGroup>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
