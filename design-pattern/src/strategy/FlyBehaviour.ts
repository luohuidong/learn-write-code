export interface FlyBehaviour {
  fly: () => void;
}

export class FlyWithWings implements FlyBehaviour {
  fly(this: FlyWithWings) {
    // 使用翅膀飞
  }
}

export class FlyNoWay implements FlyBehaviour {
  fly(this: FlyNoWay) {
    // 不能飞
  }
}
