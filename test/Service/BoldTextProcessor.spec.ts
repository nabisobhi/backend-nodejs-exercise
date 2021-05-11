import BoldTextProcessor from "../../src/Service/BoldTextProcessor";
import FakeTextProcessor from "./FakeTextProcessor";

describe("BoldTextProcessor test cases", () => {
    it('Make all accurencess bold in the text', async () => {
        const fakeTextProcessor = new FakeTextProcessor();
        let boldTextProcessor = new BoldTextProcessor(fakeTextProcessor, ["1", "3"]);
        const output = await boldTextProcessor.Process("12345631");
        expect(output).toBe("**1**2**3**456**3****1**");
    }),
    it('Text with no request for bolding', async () => {
        const fakeTextProcessor = new FakeTextProcessor();
        let boldTextProcessor = new BoldTextProcessor(fakeTextProcessor, []);
        const output = await boldTextProcessor.Process("12345631");
        expect(output).toBe("12345631");
    }),
    it('Make the whole text bold', async () => {
        const fakeTextProcessor = new FakeTextProcessor();
        let boldTextProcessor = new BoldTextProcessor(fakeTextProcessor, ["12345631"]);
        const output = await boldTextProcessor.Process("12345631");
        expect(output).toBe("**12345631**");
    }),
    it('Make the empty string bold', async () => {
        const fakeTextProcessor = new FakeTextProcessor();
        let boldTextProcessor = new BoldTextProcessor(fakeTextProcessor, [""]);
        await expect(boldTextProcessor.Process("12345631")).rejects.toThrow();
    })
})