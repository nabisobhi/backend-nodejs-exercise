import { StringHelper } from "./Helper/StringHelper";

export default class LineFormatter {
    public constructor() {
    }

    public LineSpacing(line: string, spacing: string) {
        let formatedLine = line;
        switch (spacing) {
            case 'single':
                formatedLine += '\n';
                break;
            case 'double':
                formatedLine += '\n\n';
                break;
            default:
                throw new Error("Unsupported spacing method");
        }
        return formatedLine;
    }

    public AlignLine(line: string, lineWidth: number, textAlignment: string) {
        let formatedLine = line.trim();
        const spacesNeeded = lineWidth - formatedLine.length;
        
        if(spacesNeeded < 0)
            throw new Error('The lenght of the line should be less or equal the lineWigth parameter');

        if (spacesNeeded > 0) {
            switch (textAlignment) {
                case 'left':
                    formatedLine = formatedLine + StringHelper.GetRepeatitionOfString(spacesNeeded, " ");
                    break;
                case 'right':
                    formatedLine = StringHelper.GetRepeatitionOfString(spacesNeeded, " ") + formatedLine;
                    break;
                case 'center':
                    const leftSpaces = Math.floor(spacesNeeded / 2);
                    const rightSpaces = spacesNeeded - leftSpaces;
                    formatedLine = StringHelper.GetRepeatitionOfString(leftSpaces, " ") + formatedLine +  StringHelper.GetRepeatitionOfString(rightSpaces, " ");
                    break;
                default:
                    throw new Error("Unsupported textAlignment method");
            }
        }
        return formatedLine;
    }
}