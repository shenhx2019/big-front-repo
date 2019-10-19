// 可选参数
function sayHello1(name: string, content?: string): void{
    console.log(`${name} says ${content==null?"hello,world":content}`)
}
sayHello1('shx','hello,typescript');
// 默认参数
function sayHello2(name: string,content:string = "hello,script"): void {
    console.log(`${name} says ${content==null?"hello,world":content}`)
}
sayHello2('shx')
// 剩余参数
type Add = number;
function add1(...nums: number[]): Add{
    let result = 0;
    nums.forEach(num => result+=num);
    return result;
}
let addResult = add1(1,3,4,5,6);
console.log(addResult);
// promiss（后面实战中编写）
// async和await（后续实战中编写）