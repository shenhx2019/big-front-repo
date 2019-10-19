// interface（接口）
interface A {
    a: number,
    b: string,
    c: number[]
}
let a1: A;
// console.log(a1.d); // error  没有生命该属性
// 交叉类型（合并数据）
interface B {
    d: number
}
let a2: A & B;
// a2.d = 2;
// console.log(a2.d);
// 联合类型（取交集数据）
interface C{
    d: string,
    e: number
}
let a3: B | C;
// a3.d = true; // false
// a3.d = 'hello';
// console.log(a3.d);
// a3.d = 5;
// console.log(a3.d);
// a3.e // error
// 类型保护与区分类型
interface Teacher{
    teach(): void;
}
interface Student{
    learn(): void;
}
interface Employee{
    sale(): void;
}
function getPerson(): Teacher | Student{
    return {} as Teacher;
}

const person = getPerson();
function isTeacher(person: Teacher | Student): person is Teacher{
    return (<Teacher>person).teach !== undefined;
}
// if(isTeacher(person)){
//     person.teach();
// }else{
//     person.learn();// 自动识别出
// }
// typeof和instanceof

// 类型别名
type Age = number; // 使用Age替换number
let a4: Age = 1;
console.log(typeof a4);
// 字面量类型
type Lessions = "vue" | "react" | "rxjs";
function selectSubLession(lession: Lessions){
}
// selectSubLession('hello,world'); //error
// 索引类型和映射类型（后面再细化）

