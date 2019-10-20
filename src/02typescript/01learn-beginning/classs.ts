// 函数类型
interface XxxFunc{
    (para1: string): boolean;
}
let yyyOjb: XxxFunc = function(para1: string){
    return false;
}
// 可索引的类型
interface StringArray{
    [index: number]: string;
}
let myArray: StringArray = ['bob','fff'];
console.log(myArray[0]);