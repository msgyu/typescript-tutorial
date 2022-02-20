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

type EngineerBlogger = Engineer & Blogger;

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



/**
 * 
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
    /**
     * エラー：プロパティ 'role' は型 'NomadWorker' に存在しません。プロパティ 'role' は型 'Blogger' に存在しません。
     * /
    // nomadWorker.role
  }

  /**
   * roleというkeyがあるかどうか判定
   */
  if ('role' in nomadWorker) {
    return nomadWorker.role; // エラーなし
  }

}

