
/**
 * 継承なしクラス
 */
// abstract class Person {
class Person {
  /** 
   * 初期化処理：省略可能
   */
  // name: string;
  // age: number;
  // private password: String;  // private：このクラス内で利用可能。

  // 初期化処理：省略可能
  // constructor(initName: string, initAge: number, initPassword: String) {
  //   this.name = initName;
  //   this.age = initAge;
  //   this.password = initPassword;
  // }

  // 省略version
  constructor(public name: string, public age: number, protected password: String) {
  }

  /** 
   * readonly：読み込み専用 public or private + readonly と記述する。
   * readonlyを付与して、読み込み専用にすることも可能。クラス内でも編集不可。
   * */
  // constructor(public name: string, public readonly age: number, private readonly password: String) {
  // }

  // privateメソッド
  private incrementAge() {
    this.age += 1;
  }

  // publicメソッド
  greeting(this: Person) {
    console.log(`Hello! My name is ${this.name}`);
  }
}

const quill = new Person('輝', 22, 'password');

let person2: Person;
console.log(quill);

quill.greeting();


const anotherQuill = {
  name: 'anotherQuill',
  age: 27,
  password: 'password',
  greeting: quill.greeting
}


/**
 * クラスの継承
 */
class Teacher extends Person {
  private static instance: Teacher;

  /**
   * コンストラクターだけだとエラー。
   * 派生クラスのコンストラクターには 'super' の呼び出しを含める必要があります。
   */
  // constructor() { }
  constructor(name: string, age: number, password: string, public _subject: string) {
    // 継承元のPersonのconstructor()の内容を記述。新しく追加したsubjectは省略可能
    super(name, age, password);

  }

  get subject(): string {
    if (!this._subject) {
      throw new Error('There is no subject.');
    }

    return this._subject;
  }

  // 'set' アクセサーにはパラメーターを 1 つだけ指定しなければなりません。
  set subject(value: string) {
    if (!value) {
      throw new Error('There is no subject.')
    }
    this._subject = value;

  }

  static getInstance() {
    if (Teacher.instance) return this.instance;
    this.instance = new Teacher('田中先生', 47, 'tanaka2011', 'music');
    return Teacher.instance;
  }

}

const teacher = new Teacher('田中先生', 47, 'tanaka2011', 'music');
