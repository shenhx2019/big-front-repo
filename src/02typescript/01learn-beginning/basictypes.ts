// boolean
let yesOrNo : boolean = true;
// number
let a: number = 1_000; // 表示1000
// string
// tips name will be declare at other file
let name1: string = "hehe";
let desc: string = `hello, my name is ${name1}`;
let name2 = "xiaomi";// ??????
let name3: any = "xiaomi";
// name2 = 1; // error ?????
/* ????? */
console.log(desc);
if(name2 === name3){
    console.log('xiaomi');
}
// null
let myNullValue = null;
// undefine
let myUndefineValue = undefined;
/* ???? */
if(myNullValue === myUndefineValue){
    console.log("error,null can'not be equal to undefined")
}
// array
let list1: number[] = [1,2,3];
let list2: Array<number> = [1,2,3];
// type assert
let unkownTypeString: any = 'this is a string?';
let kownTypeString = (<string>unkownTypeString);
let kownTypeString2 = (unkownTypeString as string);// ??
/* ?????? */
let unsureString: any = '3';
let sureString = (unsureString as string);
console.log(typeof sureString);
console.log(sureString);
// ??
function sayHello<T>(args: T): T { // ????????T ????????
    return args;
}
/* ???? */
console.log(sayHello('hello,worl'));
console.log(sayHello<number>(1));
// ??
enum myFavoJavascriptLibs{
    vue=0,
    react
}
/* ????? */
enum stringEnum{
    vue="vue3",
    react="react"
}
// symbol??es6????
// const A = Symbol('a');
// const B = Symbol('a');
// console.log(A === B); // always false
/* symbol?? */
const s = Symbol();
// TS2585 fix : https://stackoverflow.com/questions/54014405/ts2585-promise-only-refers-to-a-type-but-is-being-used-as-a-value-here
/* ??tsconfig.json?? */
const symbolObject = {
    [s]: "hello,world"
};
console.log(symbolObject[s]);
// iterator???Symbol.iterator????????????
const array = [2,"33",'3hello',true];
for(let value of array){
    console.log(value);
}
console.log('***********');
for(let i in array){
    let item = array[i];
    console.log(item);
}
// generator
/* 
function *????generator??????
*/
console.log('******generator******')
function * testGenerator(a){
    let b = a + 1;
    console.log(b);
    let c = yield;
    console.log(c);
}
const testYield = testGenerator(1);
testYield.next(2);// ?????
testYield.next(3);
