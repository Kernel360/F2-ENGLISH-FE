import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatViewCount(count: number) {
  const billion = 100000000; // 억
  const tenThousand = 10000; // 만
  const thousand = 1000; // 천

  const formatNumber = (num: number) => {
    const fixedNum = num.toFixed(1);
    return parseFloat(fixedNum) % 1 === 0 ? fixedNum.split('.')[0] : fixedNum;
  };

  if (count >= billion) {
    const result = count / billion;
    return `${formatNumber(result)}억회`;
  }

  if (count >= tenThousand) {
    // 만 단위 이상은 만으로 표기
    const result = Math.floor(count / tenThousand);
    return `${formatNumber(result)}만회`;
  }

  if (count >= thousand) {
    const result = count / thousand;
    return `${formatNumber(result)}천회`;
  }

  return `${count}회`; // 천 미만일 경우 그대로 표시
}

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};
