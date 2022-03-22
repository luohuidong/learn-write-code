class Singleton {
  private static instance: Singleton;

  static getInstance() {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }

  private constructor() {}
}

const a = Singleton.getInstance();
const b = Singleton.getInstance();
console.log(a === b);
