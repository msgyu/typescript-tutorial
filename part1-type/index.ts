/**
 * 基本 型を理解する
 * 
 * 変数: 型 = 値; 
 */

const barth = "hello!";
console.log(barth);

let hasValue: boolean = true;
console.log(hasValue);


/**
 * any
 */

let anything: any = true;
anything = 'hello';
anything = 99;
anything = {};


/**
 * Union型
 */


let unionType: number | string = 10;

// unionType = ['aa'];
// 型 'string[]' を型 'string | number' に割り当てることはできません。
//   型 'string[]' を型 'string' に割り当てることはできません。


// 配列の場合
let unionTypes: (number | string)[] = [222, 'hello'];


// エラーになる。
// let unionArrayTypes: number[] | string[] = [222, 'hello'];
/**
 * エラーが表示される。
 * 型 '(string | number)[]' を型 'number[] | string[]' に割り当てることはできません。
  型 '(string | number)[]' を型 'number[]' に割り当てることはできません。
    型 'string | number' を型 'number' に割り当てることはできません。
      型 'string' を型 'number' に割り当てることはできません。
 */


// 配列の型定義について
let StringArray: String[] = ['文字の配列に対応', 'これなら入るよ'];
let NumberArray: Number[] = [1, 2, 3, 4, 5, 6];
let StringOrNumberArray: (String | Number)[] = ['文字も数字もいけるよ', 111222];
let ArrayInnerType: [String, Number, Boolean] = ['配列の順番ごとに型定義ができる', 22222, true];


/**
 * リテラル型
 */

// リテラル型　文字の型定義について 
let StringVariable: String = "文字列なら値を変えられるよ"
const apple: "appleだけ" = "appleだけ";

// リテラル型のUnion
let clothSize: 'small' | 'medium' | 'large' = 'small';
clothSize = 'medium'; 
clothSize = 'large';


// オブジェクトの型定義 + リテラル
const cloth: {
  color: string;
  size: 'small' | 'medium' | 'large'
} = {
  color: 'white',
  size: 'medium',
}


/**
 * Enum
 */

 enum CoffeSize {
    SHORT = 'SHORT',
    TALL = 'TALL',
    GRANDE = 'GRANDE',
    VENTI = 'VENTI'
  }
  
  console.log(CoffeSize.SHORT);


/**
 * Type型
 */

type ClothSize = 'small' | 'medium' | 'large';

// typeの場合
const jeans: {
  color: string;
  size: ClothSize
} = {
  color: 'white',
  size: 'small', // 補完機能で選択肢が表示される。
}

// enum でもいける
const sheet: {
  color: string;
  size: CoffeSize
} = {
  color: 'white',
  size: CoffeSize.SHORT, // 補完機能で選択肢が表示される。
}


/**
 * 関数
 * 
 *  ①
 *  (引数の型):戻り値 {
 *      処理
 *  }
 * 
 *  ②
 *  (引数の型) => 戻り値の型 = 型が当てはまる処理
 * 
 *  ③
 *  (引数の型):戻り値 => 処理
 * 

 */


// 関数
function addNumber(num1: number, num2: number): number {
  return num1 + num2;
}

function returnVoid(): void {
  return;
}
console.log(returnVoid());  // undefined


// 変数に関数を代入する (引数の型) => 戻り値の型 = 型が当てはまる処理
const anotherAdd: (n1: number, n2: number) => number = addNumber;



// 関数の型宣言 (引数の型):戻り値 => 処理
const doubleNumber = (num: number): number => num * 2;
console.log(doubleNumber(2));  // return 4


function doubleAndHandle(num: number, cd: (num: number) => number): void {
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







