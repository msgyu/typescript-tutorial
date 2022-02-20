"use strict";
/**
 * 継承なしクラス
 */
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
    
    /**
     * 省略version
     */ 
    constructor(name, age, password) {
        this.name = name;
        this.age = age;
        this.password = password;
    }
    /**
     * readonly：読み込み専用 public or private + readonly と記述する。
     * readonlyを付与して、読み込み専用にすることも可能。クラス内でも編集不可。
     * */
    // constructor(public name: string, public readonly age: number, private readonly password: String) {
    // }
    // privateメソッド
    incrementAge() {
        this.age += 1;
    }

    // publicメソッド
    greeting() {
        console.log(`Hello! My name is ${this.name}`);
    }
}

const quill = new Person('輝', 22, 'password');
let person2;
console.log(quill);
quill.greeting();
const anotherQuill = {
    name: 'anotherQuill',
    age: 27,
    password: 'password',
    greeting: quill.greeting
};
/**
 * クラスの継承
 */
class Teacher extends Person {
}
const teacher = new Teacher('田中先生', 47, 'tanaka2011');
