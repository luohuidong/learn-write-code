import DfaState from "./DfaState.ts";
import SimpleToken from "./SimpleToken.ts";
import SimpleTokenReader from "./SimpleTokenReader.ts";
import SimpleStringBuffer from "./StringBuffer.ts";
import TokenType from "./TokenType.ts";
import { isAlpha, isBlank, isDigit } from "./utils.ts";

export default class SimpleLexer {
  /** 临时保存 token 的文本 */
  private _tokenText: SimpleStringBuffer = new SimpleStringBuffer();

  /** 保存解析出来的 Token */
  private _tokens: SimpleToken[] = [];

  /** 当前正在解析的 Token */
  private _token = new SimpleToken();

  /**
   * 有限状态机进入初始状态。这个初始状态其实并不做停留，它马上进入其它状态。
   * 开始解析的时候，进入初始化状态；某个 Token 解析完毕，也进入初始状态，在这里把 Token 记下来，然后建立一个新的 Token
   * @param ch
   * @returns
   */
  private initToken(ch: string): DfaState {
    if (this._tokenText.length > 0) {
      // 保存 token
      this._token.text = this._tokenText.text;
      this._tokens.push(this._token);

      // 初始化 _tokenText 和 _token
      this._tokenText = new SimpleStringBuffer();
      this._token = new SimpleToken();
    }

    /** 状态机状态 */
    let newState = DfaState.Initial;
    if (isAlpha(ch)) {
      if (ch === "i") { // 在初始状态，如果字符为 i，则有可能为 int 关键字，则需要进入下一个状态来进一步确认
        newState = DfaState.IdInt1;
      } else {
        newState = DfaState.Id;
      }
      // 更改 token 的类型
      this._token.type = TokenType.Identifier;
      // 往 token 文本中追加字符
      this._tokenText.append(ch);
    } else if (isDigit(ch)) {
      newState = DfaState.IntLiteral;
      this._token.type = TokenType.IntLiteral;
      this._tokenText.append(ch);
    } else if (ch === ">") {
      newState = DfaState.GT;
      this._token.type = TokenType.GT;
      this._tokenText.append(ch);
    } else if (ch === "+") {
      newState = DfaState.Plus;
      this._token.type = TokenType.Plus;
      this._tokenText.append(ch);
    } else if (ch === "-") {
      newState = DfaState.Minus;
      this._token.type = TokenType.Minus;
      this._tokenText.append(ch);
    } else if (ch === "*") {
      newState = DfaState.Star;
      this._token.type = TokenType.Star;
      this._tokenText.append(ch);
    } else if (ch === "/") {
      newState = DfaState.Slash;
      this._token.type = TokenType.Slash;
      this._tokenText.append(ch);
    } else if (ch === ";") {
      newState = DfaState.SemiColon;
      this._token.type = TokenType.SemiColon;
      this._tokenText.append(ch);
    } else if (ch === "(") {
      newState = DfaState.LeftParen;
      this._token.type = TokenType.LeftParen;
      this._tokenText.append(ch);
    } else if (ch === ")") {
      newState = DfaState.RightParen;
      this._token.type = TokenType.RightParen;
      this._tokenText.append(ch);
    } else if (ch === "=") {
      newState = DfaState.Assignment;
      this._token.type = TokenType.Assignment;
      this._tokenText.append(ch);
    } else {
      newState = DfaState.Initial;
    }

    return newState;
  }

  /**
   * 解析字符串，形成 Token
   * 这是一个有限状态自动机，在不同的状态中迁移
   * @param code
   */
  tokenize(code: string): SimpleTokenReader {
    this._tokens = [];

    this._tokenText = new SimpleStringBuffer();
    this._token = new SimpleToken();

    let state = DfaState.Initial;

    const chArr = [...code];

    chArr.forEach((ch) => {
      switch (state) {
        case DfaState.Initial:
          state = this.initToken(ch);
          break;

        case DfaState.Id:
          if (isAlpha(ch) || isDigit(ch)) {
            this._tokenText.append(ch);
          } else {
            state = this.initToken(ch);
          }
          break;

        case DfaState.GT:
          if (ch === "=") {
            this._token.type = TokenType.GE;
            state = DfaState.GE;
            this._tokenText.append(ch);
          } else {
            state = this.initToken(ch);
          }
          break;

        case DfaState.GE:
        case DfaState.Assignment:
        case DfaState.Plus:
        case DfaState.Minus:
        case DfaState.Star:
        case DfaState.Slash:
        case DfaState.SemiColon:
        case DfaState.LeftParen:
        case DfaState.RightParen:
          state = this.initToken(ch);
          break;

        case DfaState.IntLiteral:
          if (isDigit(ch)) {
            this._tokenText.append(ch);
          } else {
            state = this.initToken(ch);
          }
          break;

        case DfaState.IdInt1:
          if (ch === "n") {
            state = DfaState.IdInt2;
            this._tokenText.append(ch);
          } else if (isDigit(ch) || isAlpha(ch)) {
            state = DfaState.Id;
            this._tokenText.append(ch);
          } else {
            state = this.initToken(ch);
          }
          break;

        case DfaState.IdInt2:
          if (ch === "t") {
            state = DfaState.IdInt3;
            this._tokenText.append(ch);
          } else if (isDigit(ch) || isAlpha(ch)) {
            state = DfaState.Id;
            this._tokenText.append(ch);
          } else {
            state = this.initToken(ch);
          }
          break;

        case DfaState.IdInt3:
          if (isBlank(ch)) {
            this._token.type = TokenType.Int;
            state = this.initToken(ch);
          } else {
            state = DfaState.Id;
            this._tokenText.append(ch);
          }
          break;

        default:
      }
    });

    // 遍历完所有字符之后，将状态机的状态重置
    this.initToken("");

    return new SimpleTokenReader(this._tokens);
  }
}
