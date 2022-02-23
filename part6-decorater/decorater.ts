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

@Component('<h1>{{ name }}</h1>', '#app') // User3.nameを入れる 
@Logging3('Loging user') // ()をつけている。なので、引数が利用可能になる。
class User3 {
    name = 'Quill';
    constructor() {
        console.log('User was created!');
    }
}

const user31 = new User();
const user32 = new User();
const user33 = new User();
const user34 = new User();




/**
 *  107: 複数のデコレータを同時に利用する。
 */

