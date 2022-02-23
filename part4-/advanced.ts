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
 */








