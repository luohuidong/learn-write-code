/**
 * 判断字符是否为字母
 * @param ch 
 * @returns 
 */
export function isAlpha(ch: string) {
  return (ch >= "a" && ch <= "z") || (ch >= "A" && ch <= "Z");
}

/**
 * 判断字符是否为数字
 * @param ch 
 * @returns 
 */
export function isDigit(ch: string) {
  return ch >= "0" && ch <= "9";
}

/**
 * 判断字符是否为空白字符
 * @param ch 
 * @returns 
 */
export function isBlank(ch: string) {
  return ch === ' ' || ch === '\t' || ch === '\n';
}
