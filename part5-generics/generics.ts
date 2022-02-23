/**
 * Generics
 * <T>などで型を変数やメソッドのように渡すことができる。
 */

function copy<T>(value: T): T {
    return value;
}

console.log(copy<string>('hello'));


/**
 * 制約をつけるextends
 */

 function copyWithExtends<T extends {name: string }>(value: T): T {
    return value;
}

// console.log(copyWithExtends<string>('hello')); // エラー
// 型 'string' は制約 '{ name: string; }' を満たしていません。
// ジェネリクスも変数のように型定義できる。その際はextendsを利用する。

class BaseUser {
    constructor(public name: string, public age: number) { }
}

let baseUser = new BaseUser('春清', 32);

console.log(copyWithExtends<BaseUser>(baseUser)); // 特定のプロパティを持つクラスに限定したりなどできる。



/**
 * keyof 演算子を利用したGenerics
 */

type K = keyof { name: string, age: number};
// type K = "name" | "age"
// オブジェクトのkeyを並べたUnion型を生成。

function copyByKeyof<T extends { name: string}, U extends keyof T>(value: T, key: U): T {
    return value;
}

console.log(copyByKeyof({ name: 'Quill', age: 8}, 'name')); // Tのオブジェクトのkeyを並べたUnion型がUで、nameは第一引数に含まれるため、エラーなし。
console.log(copyByKeyof({ name: 'Quill', age: 8}, 'age'));  // Tのオブジェクトのkeyを並べたUnion型がUで、ageは第一引数に含まれるため、エラーなし。
// console.log(copyByKeyof({ name: 'Quill', age: 8}, 'foo'));  // fooは第一引数のkeyにないためエラー。




/**
 * Genelicsをclassで利用する
 */


class LightDatabase<T extends string | number | boolean> {
    private data: T[] = [];

    add(item: T) {
        this.data.push(item);
    }

    remove(item: T) {
        this.data.splice(this.data.indexOf(item), 1);
    }
    get() {
        return this.data;
    }
}

const stringLightDatabase = new LightDatabase<string>();
stringLightDatabase.add('Apple');
stringLightDatabase.add('Banana');
stringLightDatabase.add('Grape');
console.log(stringLightDatabase.get());


/**
 * Utility型
 * 型のライブラリ。importして利用することができる。
 */


interface Todo {
    title: string;
    text: string;
}

type Todoable = Partial<Todo>;
// type Todoable = {
//     title?: string | undefined; 
//     text?: string | undefined;
// }

/**
 * readonlyにする
 */
type ReadTodo = Readonly<Todo>;
// type ReadTodo = {
//     readonly title: string; 
//     readonly text: string;
// }


const fetchData: Promise<string> = new Promise(resolve => {
    setTimeout(() => {
        resolve('hello');
    }, 3000)
});

fetchData.then(data => {
    data
})

const vegetables: Array<string> = ['Tomato', 'Broccoli'];


