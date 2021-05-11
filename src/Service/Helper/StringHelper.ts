export module StringHelper {
    export function GetRepeatitionOfString(n: number, stringToRepeat: string): string {
        if(n <= 0)
            throw new RangeError("n must be greater than zero");
        let result = ''
        for (let index = 0; index < n; index++) {
            result += stringToRepeat;
        }
        return result;
     }
    
}