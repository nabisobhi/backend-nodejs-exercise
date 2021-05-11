import ITextProcessor from "./Common/ITextProcessor";
import ILineFormatter from "./Common/ILineFormatter";

export default class FormatTextProcessor implements ITextProcessor {
    private lineFormatter: ILineFormatter;
    private lineWidth: number;
    private textAlignment: string;
    private spacing: string

    public constructor(lineFormatter: ILineFormatter, lineWidth: number, textAlignment: string, spacing: string) {
        this.lineFormatter = lineFormatter;
        this.lineWidth = lineWidth;
        this.textAlignment = textAlignment;
        this.spacing = spacing;
    }

    public async Process(text: string): Promise<string> {
        const paragraphs = text.split('\n')
        let processedParagraphs: Array<string> = [];
        paragraphs.forEach(paragraph => {
            processedParagraphs.push(this.formatParagraph(paragraph));
        });
        return processedParagraphs.join('\n');
    }
    
    private formatParagraph(paragraph: string) {
        let currentParagraphPosition = 0;
        let frmatedParagraph = '';
        while (currentParagraphPosition < paragraph.length) {
            let currentLine = this.extractNextLine(paragraph, currentParagraphPosition);
            currentParagraphPosition += currentLine.length;
            currentLine = this.lineFormatter.AlignLine(currentLine, this.lineWidth, this.textAlignment)
            if(currentParagraphPosition < paragraph.length)
                currentLine = this.lineFormatter.LineSpacing(currentLine, this.spacing);
            frmatedParagraph += currentLine;
        }
        return frmatedParagraph;
    }

    private extractNextLine(paragraph: string, currentParagraphPosition: number) {
        let endOfSubstring = currentParagraphPosition + this.lineWidth;
        if (endOfSubstring >= paragraph.length) {
            endOfSubstring = paragraph.length;
        }
        else {
            if(paragraph[endOfSubstring] != ' ') {
                //find the position of last word
                let endOfLine = paragraph.lastIndexOf(" ", endOfSubstring);
                if (endOfLine > 0) {
                    endOfSubstring = endOfLine;
                }
            }
        }
        return paragraph.substring(currentParagraphPosition, endOfSubstring);
    }
}