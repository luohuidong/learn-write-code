export default function climbStairs(n: number): number {
  if (n <= 2) {
    return n;
  }

  let tmp1 = 1; // f(n-2)
  let tmp2 = 1; // f(n-1)
  let tmp3 = 0; // f(n)

  for (let i = 1; i < n; i++) {
    tmp3 = tmp1 + tmp2;
    [tmp2, tmp1] = [tmp3, tmp2];
  }

  return tmp3;
}
