import LineFormatter from "../../src/Service/LineFormatter";

describe("LineFormatter test cases", () => {
    it('Alignt a line left', () => {
        let lineFormatter = new LineFormatter();
        const output = lineFormatter.AlignLine("123", 8, "left");
        expect(output).toBe("123     ");
    }),
    it('Alignt a line right', () => {
        let lineFormatter = new LineFormatter();
        const output = lineFormatter.AlignLine("123", 8, "right");
        expect(output).toBe("     123");
    }),
    it('Alignt a line center', () => {
        let lineFormatter = new LineFormatter();
        const output = lineFormatter.AlignLine("123", 8, "center");
        expect(output).toBe("  123   ");
    }),
    it('Alignt a full line', () => {
        let lineFormatter = new LineFormatter();
        const output = lineFormatter.AlignLine("12345678", 8, "center");
        expect(output).toBe("12345678");
    }),
    test('Alignt a line with unsupported textAlign parameter', () => {
        let lineFormatter = new LineFormatter();
        expect(() => lineFormatter.AlignLine("123", 8, "righft")).toThrow();
    }),
    it('single lineSpacing', () => {
        let lineFormatter = new LineFormatter();
        const output = lineFormatter.LineSpacing("123", "single");
        expect(output).toBe("123\n");
    }),
    it('double lineSpacing', () => {
        let lineFormatter = new LineFormatter();
        const output = lineFormatter.LineSpacing("123", "double");
        expect(output).toBe("123\n\n");
    }),
    it('Unsupported lineSpacing', () => {
        let lineFormatter = new LineFormatter();
        expect(() => lineFormatter.LineSpacing("123", "doublee")).toThrow();
    })
})