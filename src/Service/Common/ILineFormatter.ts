export default interface ILineFormatter {
    LineSpacing(line: string, spacing: string);
    AlignLine(line: string, lineWidth: number, textAlignment: string);
}