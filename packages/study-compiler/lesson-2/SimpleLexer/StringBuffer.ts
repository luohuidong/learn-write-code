/** 仿 Java StringBuffer 实现一个 JavaScript 版的简易 StringBuffer，可动态往字符串追加字符 */
export default class SimpleStringBuffer {
  private _text = "";

  get length() {
    return this._text.length;
  }

  get text() {
    return this._text;
  }

  append(char: string) {
    this._text = this._text + char;
  }
}
