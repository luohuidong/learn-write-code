export type Datas = {
  id: number;
  title: string;
  content: string;
}[];

export default function useDatas() {
  const datas: Datas = [];

  for (let i = 0; i < 100; i++) {
    let content = "";

    for (let i = 0; i < 10; i++) {
      content +=
        "这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容";
    }

    datas.push({
      id: i,
      title: `这是标题-${i}`,
      content,
    });
  }

  return datas;
}
