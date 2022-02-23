"use strict";
/**
 * & を利用して、複数条件の反映
 */
var _a, _b, _c;
// ユニークの形式で3つの要素が合算された型。（オブジェクトの場合）
const quill = {
    name: 'Quill',
    role: 'front-end',
    follower: 1000,
};
// type Mix = number 共通条件のnumberだけになる。
// type NumberOrBoolean2 = number & boolean;
// type StringOrNumber2 = string & number;
// type Mix2 = NumberOrBoolean2 & StringOrNumber2;
// type Mix2 = never
/**
 * typeofで型を確定し、その型のメソッドを利用可能にする。
 */
function toUpperCase(x) {
    x.toString();
    x.valueOf();
    if (typeof x === 'string') {
        // string型が確定するので、string系のメソッドが利用可能になる。
        return x.toUpperCase();
    }
    return '';
}
function describeProfile(nomadWorker) {
    /**
     * EngineerとBloggerの共通要素であるnameだけ利用可能
     */
    console.log(nomadWorker.name);
    // if (typeof nomadWorker === Engineer) { // objectとしか不可
    if (typeof nomadWorker === 'object') {
        //   nomadWorker.role  // エラーあり：プロパティ 'role' は型 'NomadWorker' に存在しません。プロパティ 'role' は型 'Blogger' に存在しません。
    }
    //   if (nomadWorker instanceof Engineer) {}  // エラー：'Engineer' は型のみを参照しますが、ここで値として使用されています。
    /**
     * roleというkeyがあるかどうか判定
     */
    if ('role' in nomadWorker) {
        return nomadWorker.role; // エラーなし
    }
}
/**
 * タグ付きUnion　デザインパターン
 */
class Dog {
    constructor() {
        this.kind = 'dog';
    }
    speak() {
        console.log('bow-wow');
    }
}
class Bird {
    constructor() {
        this.kind = 'bird';
    }
    speak() {
        console.log('tweet-tweet');
    }
    fly() {
        console.log('flutter');
    }
}
function havePet(pet) {
    pet.speak();
    switch (pet.kind) {
        case 'bird':
            pet.fly(); // Birdのメソッドが利用可能
    }
    if (pet instanceof Bird) {
        pet.fly(); // Birdのメソッドが利用可能
    }
}
havePet(new Bird());
/**
 * 型アサーション
 */
// NG
const input = document.getElementById('input'); // nullable
// HTMLElement インターフェース 抽象的
// NG
// const input2: HTMLInputElement = document.getElementById('input'); 
// エラー：型 'HTMLInputElement | null' を型 'HTMLInputElement' に割り当てることはできません。型 'null' を型 'HTMLInputElement' に割り当てることはできません。
// OK
const inputAssertion = document.getElementById('input'); //型アサーション
inputAssertion.value = 'initial input value';
// JSXを利用する場合は向いていない。
const inputAssertion2 = document.getElementById('input'); //型アサーション
// JSXでも対応可能
//補足：これでもいけます
document.getElementById('input').value = 'initial input value';
/**
 * Non-null assertion operator
 * !でnullを許容しない。
 */
const inputNonNullAssertion = document.getElementById('input'); //non-nullアサーション!
const designer = {
    name: 'Quill',
    // role: 'roleは不可' // 型安全のため、不可
};
const designer2 = {
    name: 'Quill',
    role: 'roleは可能',
    1: 'keyが数字でもok',
};
console.log(designer2.test); // 存在しないプロパティも通ってしない....。
function toUpperCase2(x) {
    x.toString();
    x.valueOf();
    if (typeof x === 'string') {
        // string型が確定するので、string系のメソッドが利用可能になる。
        return x.toUpperCase();
    }
    return x;
}
const upperHello1 = toUpperCase2('hello'); // const upperHello1: string | number
const upperHello2 = toUpperCase2('hello'); // 毎回型アサーションをするのはめんどくさい。
const upperHello3 = toUpperCase2('hello'); // オーバーロードすることで、型アサーションしなくてもよい。
const downloadedDateNonUser = {
    id: 1,
};
const downloadedDate = {
    id: 1,
    user: {
        name: {
            first: "田中",
            last: "太郎"
        }
    }
};
// console.log(downloadedDate.user.name.first); // オブジェクトは 'undefined' である可能性があります。
// console.log(downloadedDate.user!.name.first); // Non-null アサーション → エラー： Object is possibly 'undefined'.
console.log((_b = (_a = downloadedDate.user) === null || _a === void 0 ? void 0 : _a.name) === null || _b === void 0 ? void 0 : _b.first); // ? nullの場合、undefineを返す。
const userDate = (_c = downloadedDate.user) !== null && _c !== void 0 ? _c : 'no-user'; // Nulish Coalescing
const userDateOr = downloadedDate.user || 'no-user'; // falseの条件が異なる。0や空でもfalse
// type user = {
//     name?: {
//         first: string;
//         last: string;
//     } | undefined;
// } | undefined
/**
 * 型の互換性
 * リテラル型はstring型と互換性がない。
 * enumとnumberは互換性がある。ただし、enum型とenum型は互換性がない。
 * 関数は元の関数が優先される。多い = 少ない の場合、エラーが発生しない。 少 = 多 だった場合、エラーになる。どちらにせよ、メソッド使用時にエラーになる。
 */
let target = 'hello';
let source = 'hello';
target = source;
// let target: string
// string型だから、'hello'を受け入れられる。
// 逆にするとエラー
let target2 = 'hello';
let source2 = 'hello';
// target2 = source2;  //型 'string' を型 '"hello"' に割り当てることはできません。
// let target2: "hello"
// 'hello'だがstring型を含めて型定義を=にすることはできない。
// つまり、条件を満たせていないので、型の上書きはできない。
// リテラル型はstring型と互換性がない。
var Color;
(function (Color) {
    Color[Color["RED"] = 0] = "RED";
    Color[Color["BLUE"] = 1] = "BLUE";
})(Color || (Color = {}));
let target3 = Color.RED; //(enum member) Color.RED = 0
// let target3: Color
let source3 = 0;
target3 = source3;
// let target3: Color
// enum型とnumberは互換性がある。
// enum型とenum型は互換性がない。
/**
 * 関数の型の互換性
 */
let targetFunction = function (a) { };
let sourceFunction = function (a, b) { };
// targetFunction = sourceFunction; // エラーあり
// let targetFunction: (a: string) => void
//エラー：型 '(a: string, b: string) => void' を型 '(a: string) => void' に割り当てることはできません。
// 型を増やせない？？？？
targetFunction('hi');
// エラーが出ない。
let targetFunction2 = function (a, b) { };
let sourceFunction2 = function (a) { };
targetFunction2 = sourceFunction2; // エラーなし
// let targetFunction2: (a: string, b: string) => void
// 型はそのまま。上書きされていない。
// let targetFunctionTest = targetFunction2('hi'); // エラー
// 2 個の引数が必要ですが、1 個指定されました。
//　元の型の方が優先される。
let targetFunctionTest2 = targetFunction2('hi', 'hello');
/**
 * Classの型の互換性
 */
class AdvancedPerson {
    constructor() {
        this.name = 'Peter';
    }
}
class AdvancedCar {
    constructor() {
        this.name = 'Peter';
    }
}
let targetClass = new AdvancedPerson();
let sourceClass = new AdvancedCar();
targetClass = sourceClass; // エラーなし
class AdvancedPerson2 {
    constructor() {
        this.name = 'Peter';
        this.age = 35; // privateは他のclassと互換性がない。
    }
}
class AdvancedCar2 {
    constructor() {
        this.name = 'Peter';
        this.age = 5;
    }
}
let targetClass2 = new AdvancedPerson2();
let sourceClass2 = new AdvancedCar2();
// targetClass2 = sourceClass2; // エラーあり
// エラー：型 'AdvancedCar2' を型 'AdvancedPerson2' に割り当てることはできません。プロパティ 'age' は型 'AdvancedPerson2' ではプライベートですが、型 'AdvancedCar2' ではプライベートではありません。
