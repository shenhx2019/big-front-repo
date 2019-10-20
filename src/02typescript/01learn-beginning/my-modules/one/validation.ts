namespace Validation {
    export interface StringValidator {
        isAcceptable(s: string): boolean;
    }
    const letterRegexp = /^[a-zA-Z]+$/;
    const numberRegexp = /^[0-9]+$/;
    export class LettersOnlyValidator implements StringValidator {
        isAcceptable (s: string){
            return letterRegexp.test(s);
        }
    }

    export class ZipCodeValidator implements StringValidator {
        isAcceptable(s: string){
            return s.length === 5 && numberRegexp.test(s);
        }
    }
}

// test
let strings = ["Hello","34344","212"];
let validators: {[s: string]: Validation.StringValidator} = {};
validators["zip code"] = new Validation.ZipCodeValidator();
validators["letter only"] = new Validation.LettersOnlyValidator();
for(let s of strings){
    for (let name in validators){
        console.log(`${s} - ${validators[name].isAcceptable ? "符合" : "不符合"} ${name}`);
    }
}
