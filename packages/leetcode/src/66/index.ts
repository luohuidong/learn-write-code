export default function plusOne(digits: number[]): number[] {
  const number = BigInt(digits.join("")) + BigInt(1);
  return [...String(number)].map((element) => Number(element));
}
