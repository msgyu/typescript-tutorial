/**
 * 継承元のinsterface
 */
interface Nameable {
  name?: string;
}

interface addFunc {   // type addFunc = (num1: number, num2: number): number;
  // 無名関数 （変数: 型, 変数: 型）=> 戻り値;
  (num1: number, num2: number): number;
}

/**
 * typeでも継承させることができる。
 *  type Name = { }; なので、=を忘れずに。
 */
// type Nameable = {
//   name: string;
// }



/**
 * 継承したinterface
 */
interface Human extends Nameable {
  name: string;
  // name: "hello"; string から派生して 文字列にすることもできる。リテラル型

  age: number;

  /**
   * 修飾子の理解
   */
  // readonly name: string;  // readonlyのみ利用可能
  // public name: string;    // エラー：'public' 修飾子は型メンバーでは使用できません。
  // private name: string;   // エラー：'private' 修飾子は型メンバーでは使用できません。

  /**
   * メソッドの書き方
   * ES5の書き方  メソッド名(): (引数: 型) => 戻り値の型;
   */
  // greeting: (message: string) => string; ES5の書き方

  /**  
   * メソッドの書き方
   * ES6のの書き方   メソッド名(引数の型): 戻り値の型
   * */
  greeting(message?: string): string;
}

/**
 * typeでも代用することができる。
 */
// type Human = {
//   name: string;
//   age: number;
//   greeting(message: string): string;
// }

// const human: Human = {
//   name: 'Quill',
//   age: 38,

//   /**
//    * アロー関数で記述したメソッド
//    */
//   // greeting: (message: string) => {  // ES5の書き方
//   //   return message;
//   // }

//   greeting(message?: string) {  // ES6の書き方
//     return message;
//   }
// }


let developer: Human; // 検証用


class JapanesePeaple implements Human {
  /**
   * interface通り作らないとエラーが出る。
   * クラス 'JapanesePeaple' はインターフェイス 'Human' を正しく実装していません。
   * Type 'JapanesePeaple' is missing the following properties from type 'Human': name, age, greeting
   */
  constructor(public name: string, public age: number) { } // public・private・protectedで省略記法を採用。

  /**
   * 関数の実装がないか、宣言の直後に指定されていません。
   */
  // greeting(message: string): string;
  greeting(message: string) {
    return message;
  }

  /**
   * エラー
   * 型 'JapanesePeaple' のプロパティ 'greeting' を基本データ型 'Human' の同じプロパティに割り当てることはできません。
   * 型 '(message?: string | undefined) => string | undefined' を型 '(message?: string | undefined) => string' に割り当てることはできません。
   * 型 'string | undefined' を型 'string' に割り当てることはできません。
   * 型 'undefined' を型 'string' に割り当てることはできません。
   */
  // greeting(message?: string) {
  //   return message;
  // }

  ohayo(message: string = "おはようございます") {
    return message;
  }

  // エラー：パラメーターに疑問符および初期化子を指定することはできません。
  // ohayo(message?: string = "おはようございます") {
  //   return message;
  // }

  sayonara(message?: string) {
    if (!message) return 'さようなら';
    return message
  }
}

/**
 * interfaceと一致する情報は保つ。
 * Developerが独自に値やメソッドを保つことは当然可能。
 */
class Developer implements Human {
  constructor(public name: string, public age: number, public experience: number) { } // public・private・protectedで省略記法を採用。

  greeting(message: string) {
    return message;
  }

  /**
   * classなので拡張が可能
   */
  working(time: Date) {
    return `start: ${time}`
  }
}


/**
 * 
 * 型定義にinterfaceを利用
 * 
 * 変数: interface型 = new Class();
 * classの場合拡張が可能
 */
const user: Human = new Developer('淳', 27, 2);


const user2: Human = {
  name: 'Quill',
  age: 38,

  greeting(message: string) {
    return message;
  }

  /**
   * オブジェクト リテラルは既知のプロパティのみ指定できます。
   * 'working' は型 'Human' に存在しません。
   */
  // working(time: Date) {
  //   return `start: ${time}`
  // }
}