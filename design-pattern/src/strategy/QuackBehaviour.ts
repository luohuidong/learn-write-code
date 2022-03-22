export interface QuackBehaviour {
  quack: () => void;
}

export class Quack implements QuackBehaviour {
  quack(this: Quack) {}
}
