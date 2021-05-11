import ITextProcessor from "./Common/ITextProcessor";

export default class ItalicTextProcessor implements ITextProcessor {
    textProcessor: ITextProcessor;
    wordsToItalic: string[];

    public constructor(textProcessor: ITextProcessor, wordsToItalic: string[]) {
        this.textProcessor = textProcessor;
        this.wordsToItalic = wordsToItalic;
    }

    public async Process(text: string): Promise<string> {
        let processedText = text;
        
        this.wordsToItalic.forEach(element => {
            if(element == "")
                throw new Error("wordToItalic must not be empty.");
            processedText = processedText.replace(new RegExp(element, 'g'), "_" + element + "_");
        });

        return await this.textProcessor.Process(processedText);
    }
}