/* eslint-disable no-bitwise */
import { AxiosResponse } from '@/api/axios';

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

export function interpolateColor(color1: string, color2: string, percentage: number, opacity?: number) {
  function hexToRgb(hex: string) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return [r, g, b];
  }

  const color1Rgb = hexToRgb(color1);
  const color2Rgb = hexToRgb(color2);

  if (color1Rgb && color2Rgb) {
    const interpolatedColor = color1Rgb.map((c1, index) => {
      const c2 = color2Rgb[index];

      return Math.round(c1 + (c2 - c1) * percentage);
    });

    return `rgb(${interpolatedColor[0]}, ${interpolatedColor[1]}, ${interpolatedColor[2]}, ${opacity ?? 1})`;
  }

  return color2;
}

export async function withJWTSessionStorage<T>(promise: Promise<AxiosResponse<T>>): Promise<AxiosResponse<T>> {
  const response = await promise;
  const jwtToken = response.headers.authorization;

  if (jwtToken || jwtToken === '') {
    sessionStorage.setItem('jwtToken', jwtToken);
  }

  return response;
}
