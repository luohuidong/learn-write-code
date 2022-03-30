/** 有限状态机的各种状态。*/
enum DfaState {
  Initial,

  If,
  IdIf1,
  IdIf2,
  Else,
  IdElse1,
  IdElse2,
  IdElse3,
  IdElse4,
  Int,
  IdInt1,
  IdInt2,
  IdInt3,
  Id,
  GT,
  GE,

  Assignment,

  Plus,
  Minus,
  Star,
  Slash,

  SemiColon,
  LeftParen,
  RightParen,

  IntLiteral,
}

export default DfaState