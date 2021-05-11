import FormatTextProcessor from "../../src/Service/FormatTextProcessor";
import ILineFormatter from "../../src/Service/Common/ILineFormatter";

describe("FormatTextProcessor test cases", () => {
    const MockedLineFormatter = jest.fn<ILineFormatter, []>(() => ({
        AlignLine: (line, lineWidth): string => { return line; },
        LineSpacing: (line, spacing): string => { return line + "\n"; },
      }));
    it('Format an incomplete line', async () => {
        let formatTextProcessor = new FormatTextProcessor(new MockedLineFormatter(),
            5, "", "");
        const output = await formatTextProcessor.Process("123");
        expect(output).toBe("123");
    }),
    it('Format a tow line paragraph', async () => {
        let formatTextProcessor = new FormatTextProcessor(new MockedLineFormatter(),
            5, "", "");
        const output = await formatTextProcessor.Process("123456");
        expect(output).toBe("12345\n6");
    }),
    it('Format a tow paragraph text', async () => {
        let formatTextProcessor = new FormatTextProcessor(new MockedLineFormatter(),
            5, "", "");
        const output = await formatTextProcessor.Process("12\n345678\n9");
        expect(output).toBe("12\n34567\n8\n9");
    }),
    it('Format an empty text', async () => {
        let formatTextProcessor = new FormatTextProcessor(new MockedLineFormatter(),
            5, "", "");
        const output = await formatTextProcessor.Process("");
        expect(output).toBe("");
    }),
    it('Format multple empty paragraphs', async () => {
        let formatTextProcessor = new FormatTextProcessor(new MockedLineFormatter(),
            5, "", "");
        const output = await formatTextProcessor.Process("\n\n\n");
        expect(output).toBe("\n\n\n");
    })
})