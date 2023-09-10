import { useEffect, useRef } from 'react';
import { QueryParams } from '@/types/utils';

export function capitaliseFirstLetter(word: string, seperator?: string): string {
  let words: string[] = [word];

  if (seperator) {
    words = word.split(seperator);
  }

  return words.map((string: string) => string.charAt(0).toUpperCase() + string.slice(1)).join(' ');
}

export function abbreviateTitle(title: string): string {
  let words = title.split(' ');

  words = words.map((word) => {
    const firstLetter = word.charAt(0);

    return firstLetter === firstLetter.toUpperCase() ? firstLetter : '';
  });

  return words.join('');
}

export function stringToColor(string: string) {
  let index = 0;
  let hash = 0;
  let color = '#';

  for (index = 0; index < string.length; index += 1) {
    hash = string.charCodeAt(index) + ((hash << 5) - hash);
  }

  for (index = 0; index < 3; index += 1) {
    const value = (hash >> (index * 8)) & 0xff;

    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

export function formatDate(date: string) {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  };

  return new Date(date).toLocaleDateString('en-GB', options);
}

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}
