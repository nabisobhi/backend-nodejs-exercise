import ItalicTextProcessor from "../../src/Service/ItalicTextProcessor";
import FakeTextProcessor from "./FakeTextProcessor";

describe("ItalicTextProcessor test cases", () => {
    it('Make all accurencess italic in the text', async () => {
        const fakeTextProcessor = new FakeTextProcessor();
        let italicTextProcessor = new ItalicTextProcessor(fakeTextProcessor, ["1", "3"]);
        const output = await italicTextProcessor.Process("12345631");
        expect(output).toBe("_1_2_3_456_3__1_");
    }),
    it('Text with no request for making italic', async () => {
        const fakeTextProcessor = new FakeTextProcessor();
        let italicTextProcessor = new ItalicTextProcessor(fakeTextProcessor, []);
        const output = await italicTextProcessor.Process("12345631");
        expect(output).toBe("12345631");
    }),
    it('Make the whole text italic', async () => {
        const fakeTextProcessor = new FakeTextProcessor();
        let italicTextProcessor = new ItalicTextProcessor(fakeTextProcessor, ["12345631"]);
        const output = await italicTextProcessor.Process("12345631");
        expect(output).toBe("_12345631_");
    }),
    it('Make the empty string italic', async () => {
        const fakeTextProcessor = new FakeTextProcessor();
        let italicTextProcessor = new ItalicTextProcessor(fakeTextProcessor, [""]);
        await expect(italicTextProcessor.Process("12345631")).rejects.toThrow();
    })
})