/**
 * デコレーター
 */

// 利用するには、tsconfig.jsonの"experimentalDecorators": trueのコメントアウトを解除してください。

// デコレーションしたい関数
function Logging(constructor: Function) {
    console.log('Logging...');
    console.log(constructor);
}

@Logging // classに関数をデコレーション。付与。
class User {
    name = 'Quill';
    constructor() {
        console.log('User was created!');
    }
}

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

function Logging2(message: string) {
    return function (constructor: Function) { // デコレータの中身の処理
        console.log(message);
        console.log(constructor);
    }
}

@Logging2('Loging user') // ()をつけている。なので、引数が利用可能になる。
class User2 {
    name = 'Quill';
    constructor() {
        console.log('User was created!');
    }
}

const user21 = new User();
const user22 = new User();
const user23 = new User();
const user24 = new User();




/**
 * 106: 簡易的なフレームワークを作成する
 * デコレータは下から実行される。
 */



function Logging3(message: string) {
    return function (constructor: Function) { // デコレータの中身の処理
        console.log(message);
        console.log(constructor);
    }
}

function Component(template: string, selector: string) {
    return function (constructor: { new(...args: any): { name: string } }) { // ...args: anyでプロパティが複数あっても対応できる。
        const mountedElement = document.querySelector(selector);
        const instance = new constructor(); //Functionクラスだと、エラー。この式はコンストラクト可能ではありません。型 'Function' にはコンストラクト シグネチャがありません。ts(2351)

        if (mountedElement) {
            mountedElement.innerHTML = template; // 挿入するHTMLは第一引数のtemplate
            mountedElement.querySelector('h1')!.textContent = instance.name; // templateにあるh1タグを見つけて、instance.nameをテキスト挿入。
        }
    }
}

@Component('<h1>{{ name }}</h1>', '#app') // User3.nameを入れる  2番目に実行
@Logging3('Loging user') // ()をつけている。なので、引数が利用可能になる。 1番目に実行
class User3 {
    name = 'Quill';
    constructor() {
        console.log('User was created!');
    }
}

const user31 = new User3();
const user32 = new User3();
const user33 = new User3();
const user34 = new User3();




/**
 * 2022/2/27
 *  107: 複数のデコレータを同時に利用する。
 *  108: 別のクラスに変更する
 */


//  function Component2(template: string, selector: string) {
//     return function <T extends { new(...args: any[]): { name: string } }>(constructor: T) {{ // ...args: anyでプロパティが複数あっても対応できる。
        
//         return class extends constructor {
//             // name = 'hello' // nameがないとエラー
//             // age // constructor: { new(...args: any): { name: string } }に含まれていないのでエラーになる。
//             // ジェネリクスで対応

//             constructor(...args: any[]) {
//                 super(...args);
//                 console.log('Component');
//                 const mountedElement = document.querySelector(selector);
//                 console.log('Component 4回目');
//                 const instance = new constructor(); //Functionクラスだと、エラー。この式はコンストラクト可能ではありません。型 'Function' にはコンストラクト シグネチャがありません。ts(2351)

//                 if (mountedElement) {
//                     mountedElement.innerHTML = template; // 挿入するHTMLは第一引数のtemplate
//                     mountedElement.querySelector('h1')!.textContent = instance.name; // templateにあるh1タグを見つけて、instance.nameをテキスト挿入。
//                 }
//             }

//         }
//     }
// }

function Component4(template: string, selector: string) {
    console.log('Component Factory');
    return function <T extends { new(...args: any[]): { name: string } }>(constructor: T) {
      return class extends constructor {
        constructor(...args: any[]) {
          super(...args);
          console.log('Component');
          const mountedElement = document.querySelector(selector);
          const instance = new constructor();
          if (mountedElement) {
            mountedElement.innerHTML = template;
            mountedElement.querySelector('h1')!.textContent = instance.name;
          }
        }
      }
    }
  }

@Component4('<h1>{{ name }}</h1>', '#app') // User3.nameを入れる  2番目に実行
@Logging3('これが4回目のLoging user') // ()をつけている。なので、引数が利用可能になる。 1番目に実行
class User4 {
    name = 'Quill';
    age = 24; // 追加すると@Component2はエラーになる。ageがないため。
    constructor() {
        console.log('User was created!');
    }
}

const user41 = new User4();
const user42 = new User4();
const user43 = new User4();
const user44 = new User4();



/**
 * 109: プロパティに対して、デコレータする
 */


