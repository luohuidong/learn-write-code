import { QuackBehaviour, Quack } from "./QuackBehaviour";
import { FlyBehaviour, FlyWithWings, FlyNoWay } from "./FlyBehaviour";

class Duck {
  flyBehavior: FlyBehaviour;
  quackBehaviour: QuackBehaviour;

  constructor(flyBehavior: FlyBehaviour, quackBehaviour: QuackBehaviour) {
    this.flyBehavior = flyBehavior;
    this.quackBehaviour = quackBehaviour;
  }

  performQuack(this: Duck) {
    this.flyBehavior.fly();
  }

  performFly(this: Duck) {
    this.quackBehaviour.quack();
  }
}

const duck = new Duck(new FlyWithWings(), new Quack());
