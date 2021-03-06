export default function declOfNum(n: number, titles: string[]): string {
  return titles[
  // eslint-disable-next-line no-nested-ternary
    n % 10 === 1 && n % 100 !== 11
      ? 0
      : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
        ? 1
        : 2
  ];
}
