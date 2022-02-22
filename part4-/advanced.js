"use strict";
/**
 * & を利用して、複数条件の反映
 */
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
        return x.toUpperCase;
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
