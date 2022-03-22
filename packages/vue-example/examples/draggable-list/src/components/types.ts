export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface ExchangeEventParams {
  from: Todo & { index: number };
  to: Todo & { index: number };
}
