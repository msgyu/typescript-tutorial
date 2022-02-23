/**
 * & を利用して、複数条件の反映
 */

type Engineer = {
  name: string;
  role: string;
}

type Blogger = {
  name: string;
  follower: number;
}

// 複数のtypeを合わせる
type EngineerBlogger = Engineer & Blogger;

// ユニークの形式で3つの要素が合算された型。（オブジェクトの場合）
const quill: EngineerBlogger = {
  name: 'Quill',
  role: 'front-end',
  follower: 1000,
}

/**
 * 継承の場合は下記となる
 */
// interface EngineerBloggerInterface extends Engineer, Blogger { }


/**
 * 条件の絞り込み
 */
type NumberOrBoolean = number | boolean;
type StringOrNumber = string | number;
type Mix = NumberOrBoolean & StringOrNumber;
// type Mix = number 共通条件のnumberだけになる。

// type NumberOrBoolean2 = number & boolean;
// type StringOrNumber2 = string & number;
// type Mix2 = NumberOrBoolean2 & StringOrNumber2;
// type Mix2 = never



/**
 * typeofで型を確定し、その型のメソッドを利用可能にする。
 */

function toUpperCase(x: string | number) {
  x.toString();
  x.valueOf();

  if (typeof x === 'string') {
    // string型が確定するので、string系のメソッドが利用可能になる。
    return x.toUpperCase();
  }

  return '';
}



type NomadWorker = Engineer | Blogger;
function describeProfile(nomadWorker: NomadWorker) {
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
    kind: 'dog' = 'dog'
    speak() {
        console.log('bow-wow');
    }
}

class Bird {
    kind: 'bird' = 'bird';
    speak() {
        console.log('tweet-tweet');
    }

    fly() {
        console.log('flutter');
    }


}


type Pet = Dog | Bird;

function havePet(pet: Pet) {
    pet.speak();
    switch (pet.kind) {
        case 'bird':
            pet.fly(); // Birdのメソッドが利用可能
    }

    if (pet instanceof Bird) {
        pet.fly() // Birdのメソッドが利用可能
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
const inputAssertion = <HTMLInputElement>document.getElementById('input'); //型アサーション
inputAssertion.value = 'initial input value';
// JSXを利用する場合は向いていない。

const inputAssertion2 = document.getElementById('input') as HTMLInputElement; //型アサーション
// JSXでも対応可能


//補足：これでもいけます
(document.getElementById('input') as HTMLInputElement).value = 'initial input value';



/**
 * Non-null assertion operator
 * !でnullを許容しない。
 */


const inputNonNullAssertion = document.getElementById('input')!; //non-nullアサーション!
// inputNonNullAssertion.value = 'initial input value';
// エラー：プロパティ 'value' は型 'HTMLElement' に存在しません。



/**
 * インデックスシグネチャ
 */

// 未使用
interface Designer {
    name: string;
}

const designer: Designer = {
    name: 'Quill',
    // role: 'roleは不可' // 型安全のため、不可
}


// 使用
interface Designer2 {
    name: string;
    [index: string]: string; // インデックスシグネチャ: その他は指定した型にする。
}

const designer2: Designer2 = {
    name: 'Quill',
    role: 'roleは可能', // インデックスシグネチャで可能になる
    1: 'keyが数字でもok',
}

console.log(designer2.test); // 存在しないプロパティも通ってしない....。



/**
 * 関数のオーバーロード
 */

 function toUpperCase2(x: string): string; // オーバーロード
 function toUpperCase2(x: string | number): number; // オーバーロード
 function toUpperCase2(x: string | number): string | number {  // 元のメソッド
    x.toString();
    x.valueOf();
  
    if (typeof x === 'string') {
      // string型が確定するので、string系のメソッドが利用可能になる。
      return x.toUpperCase();
    }
  
    return x;
  }
  
 const upperHello1 = toUpperCase2('hello'); // const upperHello1: string | number
 const upperHello2 = toUpperCase2('hello') as string; // 毎回型アサーションをするのはめんどくさい。
 const upperHello3 = toUpperCase2('hello'); // オーバーロードすることで、型アサーションしなくてもよい。


/**
 * Optional Chaining
 */

interface DownloadedDate {
    id: number;
    user?: {
        name?: {
            first: string;
            last: string;
        }
    }
}

const downloadedDateNonUser: DownloadedDate = {
    id: 1,
}

const downloadedDate: DownloadedDate = {
    id: 1,
    user: {
        name: {
            first: "田中",
            last: "太郎"
        }
    }
}

// console.log(downloadedDate.user.name.first); // オブジェクトは 'undefined' である可能性があります。
// console.log(downloadedDate.user!.name.first); // Non-null アサーション → エラー： Object is possibly 'undefined'.
console.log(downloadedDate.user?.name?.first); // ? nullの場合、undefineを返す。

const userDate = downloadedDate.user ?? 'no-user'; // Nulish Coalescing
const userDateOr = downloadedDate.user || 'no-user'; // falseの条件が異なる。0や空でもfalse


/**
 * Look Up 型
 */

type id = DownloadedDate['id']; // オブジェクトで定義された項目のみ可能。この場合、idかuser
// type id = number

type user = DownloadedDate['user'];
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

let target: string = 'hello';
let source: 'hello' = 'hello';

target = source; 
// let target: string
// string型だから、'hello'を受け入れられる。

// 逆にするとエラー
let target2: 'hello' = 'hello';
let source2: string = 'hello';

// target2 = source2;  //型 'string' を型 '"hello"' に割り当てることはできません。
// let target2: "hello"
// 'hello'だがstring型を含めて型定義を=にすることはできない。
// つまり、条件を満たせていないので、型の上書きはできない。

// リテラル型はstring型と互換性がない。


enum Color {
    RED, //(enum member) Color.RED = 0
    BLUE,
}

let target3: Color = Color.RED; //(enum member) Color.RED = 0
// let target3: Color

let source3: number = 0;

target3 = source3;
// let target3: Color
// enum型とnumberは互換性がある。

// enum型とenum型は互換性がない。


/**
 * 関数の型の互換性
 */

let targetFunction = function (a: string ){ }
let sourceFunction = function (a: string, b:string){ }

// targetFunction = sourceFunction; // エラーあり
// let targetFunction: (a: string) => void
//エラー：型 '(a: string, b: string) => void' を型 '(a: string) => void' に割り当てることはできません。
// 型を増やせない？？？？

targetFunction('hi');
// エラーが出ない。

let targetFunction2 = function (a: string, b:string){ }
let sourceFunction2 = function (a: string){ }

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
    name: string = 'Peter'
}

class AdvancedCar {
    name: string = 'Peter'
}

let targetClass = new AdvancedPerson();
let sourceClass = new AdvancedCar();

targetClass = sourceClass; // エラーなし



class AdvancedPerson2 {
    name: string = 'Peter'
    private age: number = 35; // privateは他のclassと互換性がない。
}

class AdvancedCar2 {
    name: string = 'Peter'
    age: number = 5;
}

let targetClass2 = new AdvancedPerson2();
let sourceClass2 = new AdvancedCar2();

// targetClass2 = sourceClass2; // エラーあり
// エラー：型 'AdvancedCar2' を型 'AdvancedPerson2' に割り当てることはできません。プロパティ 'age' は型 'AdvancedPerson2' ではプライベートですが、型 'AdvancedCar2' ではプライベートではありません。


/**
 * ここから一旦飛ばすことにする。次はレクチャー83から。
 * ここから先は実際に書いていき、気づきを得られる部分と判断
 */



















