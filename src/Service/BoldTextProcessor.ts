import ITextProcessor from "./Common/ITextProcessor";

export default class BoldTextProcessor implements ITextProcessor {
    textProcessor: ITextProcessor;
    wordsToBold: string[];

    public constructor(textProcessor: ITextProcessor, wordsToBold: string[]) {
        this.textProcessor = textProcessor;
        this.wordsToBold = wordsToBold;
    }

    public async Process(text: string): Promise<string> {
        let processedText = text;
        
        this.wordsToBold.forEach(element => {
            if(element == "")
                throw new Error("wordToBold must not be empty.");
            processedText = processedText.replace(new RegExp(element, 'g'), "**" + element + "**");
        });

        return await this.textProcessor.Process(processedText);
    }
}