import ITextProcessor from "./Common/ITextProcessor";

export default class ReplacementTextProcessor implements ITextProcessor {
    textProcessor: ITextProcessor;
    itemsToReplace: string[][];

    public constructor(textProcessor: ITextProcessor, itemsToReplace: string[][]) {
        this.textProcessor = textProcessor;
        this.itemsToReplace = itemsToReplace;
    }

    public async Process(text: string): Promise<string> {
        let processedText = text;
        
        this.itemsToReplace.forEach(element => {
            if(element[0] == "")
                throw new Error("wordToReplace must not be empty.");
            processedText = processedText.replace(new RegExp(element[0], 'g'), element[1]);
        });

        return await this.textProcessor.Process(processedText);
    }
}