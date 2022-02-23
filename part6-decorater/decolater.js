"use strict";
/**
 * デコレーター
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// 利用するには、tsconfig.jsonの"experimentalDecorators": trueのコメントアウトを解除してください。
// デコレーションしたい関数
function Logging(constructor) {
    console.log('Logging...');
    console.log(constructor);
}
let User = class User {
    constructor() {
        this.name = 'Quill';
        console.log('User was created!');
    }
};
User = __decorate([
    Logging // classに関数をデコレーション。付与。
], User);
const user1 = new User();
const user2 = new User();
const user3 = new User();
const user4 = new User();
/**
 * デコレーターはクラスを定義時に実行されている。
 */
//$node decolater.js
// Logging...
// [class User]
// User was created!
// User was created!
// User was created!
// User was created!
/**
 * デコレータファクトリー
 * デコレータを返す関数
 * ()をつけているのが大きな特徴で、デコレータの処理をreturnで返す。
 * @Loging → @Loging(引数)
 */
function Logging2(message) {
    return function (constructor) {
        console.log(message);
        console.log(constructor);
    };
}
let User2 = class User2 {
    constructor() {
        this.name = 'Quill';
        console.log('User was created!');
    }
};
User2 = __decorate([
    Logging2('Loging user') // ()をつけている。なので、引数が利用可能になる。
], User2);
const user21 = new User();
const user22 = new User();
const user23 = new User();
const user24 = new User();
