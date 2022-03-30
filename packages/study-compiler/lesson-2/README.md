# README

[编译原理之美 —— 02 | 正则文法和有限自动机：纯手工打造词法分析器](https://time.geekbang.org/column/article/118378) 中词法分析器的 TypeScript 实现版本。

该实现版本可以解析下面几个语句：

- `age >= 45`
- `int age = 40`
- `2+3*5`

## 目录结构

```bash
│  main.ts # 编写了测试词法分析器的代码
│
└─SimpleLexer
        DfaState.ts # 定义了有限状态机状态
        index.ts # 词法分析器的代码
        SimpleToken.ts # 定义了一个简单的 Token 类，包含了 Token 的字符串以及 Token 的类型
        SimpleTokenReader.ts # 定义了读取 Token 的类型
        StringBuffer.ts # 可对字符串追加字符的类
        TokenType.ts # Token 类型
        utils.ts # 工具函数
```

## 运行

通过 deno 可以查看代码的运行结果：

```bash
deno run main.ts
```
