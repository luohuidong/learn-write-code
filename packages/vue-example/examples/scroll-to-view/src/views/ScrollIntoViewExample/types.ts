import type { Ref } from "vue";

export type Datas = {
  id: number;
  title: string;
  content: string;
}[];
export type Refs = Map<number, Ref<HTMLDivElement | null>>;
export type HighlightId = number | null;
