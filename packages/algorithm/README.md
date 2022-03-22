# Node TypeScript Template

快速创建使用 TypeScript 编写的 Node 项目

- 使用 TypeScript 进行代码编写，ts 代码请于 src 中进行编写，执行 `npm run build` 后，编译后的代码将存放于 dist 目录。
- git 提交规范使用 [cz-cli](https://github.com/commitizen/cz-cli) 因此提交代码时，请执行 `npm run commit`。
- 测试框架使用 Jest，运行 `npm run test` 后，报告将存放在 coverage 目录中。
- 使用 ESLint 作为代码检测工具
- 使用 prettier 美化代码格式，推荐使用 VSCode 进行开发，并下载 Prettier 扩展，代码在保存的时候将自动进行格式化。
- 使用 huskyrc 作为 git 钩子，在提交的时候，将使用 ESLint 进行代码语法检测以及使用 Jest 执行代码测试。
