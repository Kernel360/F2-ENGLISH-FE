export function calculateDaysBetweenDates(date1: Date, date2: Date): number {
  // 두 날짜의 차이를 밀리초 단위로 계산
  const diffInMs = date1.getTime() - date2.getTime();
  // 밀리초를 하루(24시간)의 밀리초로 나누어 일수로 변환
  const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  // 최소 1일을 반환
  return Math.max(days, 1);
}
