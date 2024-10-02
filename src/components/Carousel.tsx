'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ReadingCarouselItem from './ReadingCarouselItem';
import ListeningCarouselItem from './ListeningCarouselItem';

interface CarouselProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[]; // TODO(@smosco): data 타입 정의
  type: 'reading' | 'listening';
  itemWidth?: number;
  itemsPerPage?: number;
  title?: string;
}

const DEFAULT_ITEM_WIDTH = 320;
const DEFAULT_ITEMS_PER_PAGE = 3;

export default function Carousel({
  data,
  type,
  itemWidth = DEFAULT_ITEM_WIDTH,
  itemsPerPage = DEFAULT_ITEMS_PER_PAGE,
  title,
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const totalItems = data.length;
  const maxIndex = totalItems - itemsPerPage;

  const nextSlide = () =>
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
  const prevSlide = () =>
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }
  }, [currentIndex, itemWidth]);

  return (
    <div className="relative max-w-[1440px] mx-auto px-4">
      {/* Carousel Header */}
      {title && (
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
      )}

      {/* Carousel Container */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setShowButtons(true)}
        onMouseLeave={() => setShowButtons(false)}
      >
        {/* Carousel Items */}
        <div
          ref={carouselRef}
          className="flex transition-transform duration-300 ease-in-out"
          style={{ width: `${totalItems * itemWidth}px` }}
        >
          {data.map((item) => {
            if (type === 'reading') {
              return <ReadingCarouselItem key={item.id} item={item} />;
            }
            if (type === 'listening') {
              return <ListeningCarouselItem key={item.id} item={item} />;
            }
            return null;
          })}
        </div>

        {/* Previous Button */}
        {showButtons && currentIndex > 0 && (
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-1/2 transform -translate-y-1/2 opacity-100 transition-opacity duration-300"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        )}

        {/* Next Button */}
        {showButtons && currentIndex < maxIndex && (
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-1/2 right-0 transform -translate-y-1/2 opacity-100 transition-opacity duration-300"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        )}
      </div>
    </div>
  );
}
