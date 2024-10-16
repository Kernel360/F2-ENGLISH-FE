'use client';

import { useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SearchComponentProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchComponent({
  isOpen,
  onClose,
}: SearchComponentProps) {
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={searchRef}
      className="absolute top-0 left-0 w-full bg-background z-10"
    >
      <div className="border-b">
        <div className="flex items-center max-w-[1140px] mx-auto">
          <input
            ref={inputRef}
            type="text"
            placeholder="콘텐츠 제목 내용 검색하기"
            className="min-h-16 py-5 px-0 outline-none border-none flex-grow"
          />
          <Button
            variant="ghost"
            size="icon"
            className="ml-2"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
