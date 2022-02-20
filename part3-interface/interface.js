"use strict";
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
let developer;
class JapanesePeaple {
    /**
     * interface通り作らないとエラーが出る。
     * クラス 'JapanesePeaple' はインターフェイス 'Human' を正しく実装していません。
     * Type 'JapanesePeaple' is missing the following properties from type 'Human': name, age, greeting
     */
    constructor(name, age) {
        this.name = name;
        this.age = age;
    } // public・private・protectedで省略記法を採用。
    /**
     * 関数の実装がないか、宣言の直後に指定されていません。
     */
    // greeting(message: string): string;
    greeting(message) {
        if (!message)
            return;
        return message;
    }
}
/**
 * interfaceと一致する情報は保つ。
 * Developerが独自に値やメソッドを保つことは当然可能。
 */
class Developer {
    constructor(name, age, experience) {
        this.name = name;
        this.age = age;
        this.experience = experience;
    } // public・private・protectedで省略記法を採用。
    greeting(message) {
        return message;
    }
    /**
     * classなので拡張が可能
     */
    working(time) {
        return `start: ${time}`;
    }
}
/**
 *
 * 型定義にinterfaceを利用
 *
 * 変数: interface型 = new Class();
 * classの場合拡張が可能
 */
const user = new Developer('淳', 27, 2);
const user2 = {
    name: 'Quill',
    age: 38,
    greeting(message) {
        return message;
    }
    /**
     * オブジェクト リテラルは既知のプロパティのみ指定できます。
     * 'working' は型 'Human' に存在しません。
     */
    // working(time: Date) {
    //   return `start: ${time}`
    // }
};
