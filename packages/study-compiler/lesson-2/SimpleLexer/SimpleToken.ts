import TokenType from "./TokenType.ts";

/** Token 的简单实现 */
export default class SimpleToken {
  type: TokenType | null = null;
  text: string | null = null;
}
