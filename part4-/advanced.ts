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
    return x.toUpperCase;
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





