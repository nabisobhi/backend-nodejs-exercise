import ConditionalInsertParagraphTextProcessor from "../../src/Service/ConditionalInsertParagraphTextProcessor";
import IParagraphProvider from "../../src/Service/Common/IParagraphProvider";
import FakeTextProcessor from "./FakeTextProcessor";

describe("ConditionalInsertParagraphTextProcessor test cases", () => {
    it('Insert paragraphs in the desiered positions in multiple paragraphs', async () => {
        const fakeTextProcessor = new FakeTextProcessor();
        const MockedParagraphProvider = jest.fn<IParagraphProvider, []>(() => ({
            GetParagraph: async (): Promise<string> => { return "some"; },
          }));
        let conditionalInsertParagraphTextProcessor = new ConditionalInsertParagraphTextProcessor(
            fakeTextProcessor, ["1", "3"], new MockedParagraphProvider());
        const output = await conditionalInsertParagraphTextProcessor.Process("123\n4563\n1");
        expect(output).toBe("123\nsome\n4563\nsome\n1\nsome");
    }),
    it('Insert paragraphs in the desiered positions in a single paragraph', async () => {
        const fakeTextProcessor = new FakeTextProcessor();
        const MockedParagraphProvider = jest.fn<IParagraphProvider, []>(() => ({
            GetParagraph: async (): Promise<string> => { return "some"; },
          }));
        let conditionalInsertParagraphTextProcessor = new ConditionalInsertParagraphTextProcessor(
            fakeTextProcessor, ["1", "3"], new MockedParagraphProvider());
        const output = await conditionalInsertParagraphTextProcessor.Process("12345631");
        expect(output).toBe("12345631\nsome");
    }),
    it('Insert no paragraphs in multiple paragraphs', async () => {
        const fakeTextProcessor = new FakeTextProcessor();
        const MockedParagraphProvider = jest.fn<IParagraphProvider, []>(() => ({
            GetParagraph: async (): Promise<string> => { return "some"; },
          }));
        let conditionalInsertParagraphTextProcessor = new ConditionalInsertParagraphTextProcessor(
            fakeTextProcessor, ["9", "54"], new MockedParagraphProvider());
        const output = await conditionalInsertParagraphTextProcessor.Process("123\n45\n631");
        expect(output).toBe("123\n45\n631");
    }),
    it('Insert no paragraphs in a single paragraph', async () => {
        const fakeTextProcessor = new FakeTextProcessor();
        const MockedParagraphProvider = jest.fn<IParagraphProvider, []>(() => ({
            GetParagraph: async (): Promise<string> => { return "some"; },
          }));
        let conditionalInsertParagraphTextProcessor = new ConditionalInsertParagraphTextProcessor(
            fakeTextProcessor, ["9", "54"], new MockedParagraphProvider());
        const output = await conditionalInsertParagraphTextProcessor.Process("12345631");
        expect(output).toBe("12345631");
    }),
    it('Throw error when the wordToSearch is empty', async () => {
        const fakeTextProcessor = new FakeTextProcessor();
        const MockedParagraphProvider = jest.fn<IParagraphProvider, []>(() => ({
            GetParagraph: async (): Promise<string> => { return "some"; },
          }));
        let conditionalInsertParagraphTextProcessor = new ConditionalInsertParagraphTextProcessor(
            fakeTextProcessor, ["9", ""], new MockedParagraphProvider());
        await expect(conditionalInsertParagraphTextProcessor.Process("12345631")).rejects.toThrow();
    })
})