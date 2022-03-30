import SimpleLexer from "./SimpleLexer/index.ts";

const lexer = new SimpleLexer();

let reader = lexer.tokenize("age >= 45");
reader.dump();

reader = lexer.tokenize("int age = 40");
reader.dump();

reader = lexer.tokenize("2+3*5");
reader.dump();
