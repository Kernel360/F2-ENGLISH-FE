type LanguageCode = 'enScript' | 'koScript';

interface Subtitle extends Partial<Record<LanguageCode, string>> {
  startTimeInSecond: number;
  durationInSecond: number;
  highlightedText?: string;
}

export type { LanguageCode, Subtitle };
