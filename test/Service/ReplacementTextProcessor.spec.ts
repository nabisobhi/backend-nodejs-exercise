import ReplacementTextProcessor from "../../src/Service/ReplacementTextProcessor";
import FakeTextProcessor from "./FakeTextProcessor";

describe("ReplacementTextProcessor test cases", () => {
    it('Replace all accurencess in the text', async () => {
        const fakeTextProcessor = new FakeTextProcessor();
        let replacementTextProcessor = new ReplacementTextProcessor(fakeTextProcessor, [["1", "a"], ["3", "c"]]);
        const output = await replacementTextProcessor.Process("12345631");
        expect(output).toBe("a2c456ca");
    }),
    it('Text with no request for replacement', async () => {
        const fakeTextProcessor = new FakeTextProcessor();
        let replacementTextProcessor = new ReplacementTextProcessor(fakeTextProcessor, []);
        const output = await replacementTextProcessor.Process("12345631");
        expect(output).toBe("12345631");
    }),
    it('replace the whole text', async () => {
        const fakeTextProcessor = new FakeTextProcessor();
        let replacementTextProcessor = new ReplacementTextProcessor(fakeTextProcessor, [["12345631", "abc"]]);
        const output = await replacementTextProcessor.Process("12345631");
        expect(output).toBe("abc");
    }),
    it('Replace the empty string', async () => {
        const fakeTextProcessor = new FakeTextProcessor();
        let replacementTextProcessor = new ReplacementTextProcessor(fakeTextProcessor, [["", "abc"]]);
        await expect(replacementTextProcessor.Process("12345631")).rejects.toThrow();
    })
})