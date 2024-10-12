export const removeFirstChar = (str: string): string => {
  if (str.length <= 1) {
    return '';
  }
  return str.substring(1);
};
