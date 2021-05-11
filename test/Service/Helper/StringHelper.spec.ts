import { StringHelper } from "../../../src/Service/Helper/StringHelper";

describe("String helper test cases", () => {
    it('repeat string', () => {
        const output = StringHelper.GetRepeatitionOfString(3, "123");
        expect(output).toBe("123123123")
    }),
    it('n is negative', () => {
        const testMethod = () => StringHelper.GetRepeatitionOfString(-1, "123");
        expect(testMethod).toThrow(RangeError)
    })
})