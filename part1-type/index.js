"use strict";
const barth = "hello!";
console.log(barth);
let hasValue = true;
console.log(hasValue);
var CoffeSize;
(function (CoffeSize) {
    CoffeSize["SHORT"] = "SHORT";
    CoffeSize["TALL"] = "TALL";
    CoffeSize["GRANDE"] = "GRANDE";
    CoffeSize["VENTI"] = "VENTI";
})(CoffeSize || (CoffeSize = {}));
console.log(CoffeSize.SHORT);
let anything = true;
anything = 'hello';
anything = 99;
anything = {};
let unionType = 10;
// unionType = ['aa'];
// 型 'string[]' を型 'string | number' に割り当てることはできません。
//   型 'string[]' を型 'string' に割り当てることはできません。
let unionTypes = [222, 'hello'];
// 配列の型定義について
let StringArray = ['文字の配列に対応', 'これなら入るよ'];
let NumberArray = [1, 2, 3, 4, 5, 6];
let StringOrNumberArray = ['文字も数字もいけるよ', 111222];
let ArrayInnerType = ['配列の順番ごとに型定義ができる', 22222, true];
// 文字の型定義について
let StringVariable = "文字列なら値を変えられるよ";
const apple = "appleだけ";
let clothSize = 'small';
clothSize = 'medium';
clothSize = 'large';
const cloth = {
    color: 'white',
    size: 'medium',
};
// typeの場合
const jeans = {
    color: 'white',
    size: 'small',
};
// enum でもいける
const sheet = {
    color: 'white',
    size: CoffeSize.SHORT,
};
// 関数
function addNumber(num1, num2) {
    return num1 + num2;
}
function returnVoid() {
    return;
}
console.log(returnVoid()); // undefined
// 変数に関数を代入する (引数の型) => 戻り値の型
const anotherAdd = addNumber;
// 関数の型宣言 (引数の型):戻り値 => 処理
const doubleNumber = (num) => num * 2;
console.log(doubleNumber(2)); // return 4
function doubleAndHandle(num, cd) {
    const doubleNum = cd(num * 2);
    console.log(num * 2);
    // return doubleNum; 型 'number' を型 'void' に割り当てることはできません。
}
// :で戻り値の型宣言をしてもエラーになる。'=>' が必要です。
// function doubleAndHandle(num: number, cd: (num: number): number): void {
//   const doubleNum = cd(num * 2);
//   console.log(num * 2);
// }
doubleAndHandle(21, doubleNum => {
    return doubleNum;
});
