import SimpleToken from "./SimpleToken.ts";

interface TokenReader {
  /** 返回 Token 流中下一个 Token，并从流中去除。如果流已经为空，返回 null */
  read: () => SimpleToken | null;

  /** 返回 Token 流中下一个 Token，但不从流中取出。如果流已经为空，返回 null */
  peek: () => SimpleToken | null;

  /** Token 流回退一步，恢复原来的 Token */
  unread: () => void;

  /** 获取 Token 流当前的读取位置 */
  getPosition: () => number;

  /** 设置 Token 流当前的读取位置 */
  setPosition: (position: number) => void;

  dump: () => void;
}

/**
 * 一个简单的 Token 流
 */
export default class SimpleTokenReader implements TokenReader {
  private _tokens: SimpleToken[] = [];
  private _pos = 0;

  constructor(tokens: SimpleToken[]) {
    this._tokens = tokens;
  }

  /** 获取 Token 流中当前位置的 Token */
  read(): SimpleToken | null {
    if (this._pos < this._tokens.length) {
      return this._tokens[this._pos++];
    }

    return null;
  }

  /** 查看 Token 流中当前位置的 Token */
  peek(): SimpleToken | null {
    if (this._pos < this._tokens.length) {
      return this._tokens[this._pos];
    }

    return null;
  }

  /** 回退 Token 流的位置 */
  unread(): void {
    if (this._pos > 0) {
      this._pos--;
    }
  }

  /** 获取字节流的位置 */
  getPosition(): number {
    return this._pos;
  }

  /**
   * 设置字节流的位置
   * @param position 位置
   */
  setPosition(position: number) {
    if (position >= 0 && position < this._tokens.length) {
      this._pos = position;
    }
  }

  /** 遍历所有的 token，并输出 token 的文本内容及类型 */
  dump() {
    let token: SimpleToken | null = null;
    while ((token = this.read()) !== null) {
      console.log(`token text: "${token.text}", token type: "${token.type}"`);
    }
    console.log("\n");
  }
}
