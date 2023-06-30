export default function capitaliseFirstLetter(word: string, seperator?: string): string {
  let words: string[] = [word];

  if (seperator) {
    words = word.split(seperator);
  }

  return words.map((string: string) => string.charAt(0).toUpperCase() + string.slice(1)).join(' ');
}
