import IParagraphProvider from "./Common/IParagraphProvider";
import ITextProcessor from "./Common/ITextProcessor";

export default class ConditionalInsertParagraphTextProcessor implements ITextProcessor {
    textProcessor: ITextProcessor;
    wordsToSearch: string[];
    paragraphProvider: IParagraphProvider;

    constructor(textProcessor: ITextProcessor, wordsToSearch: string[], paragraphProvider: IParagraphProvider) {
        this.textProcessor = textProcessor;
        this.wordsToSearch = wordsToSearch;
        this.paragraphProvider = paragraphProvider;
    }

    public async Process(text: string): Promise<string> {
        const paragraphs = text.split('\n');

        let paragraphsIndexes: Array<number> = [];
        for (let index = 0; index < paragraphs.length; index++) {
            this.wordsToSearch.forEach(element => {
                if(element == "")
                    throw new Error("wordToSearch must not be empty.");
                if(paragraphsIndexes.indexOf(index + 1) == -1) {
                    if(paragraphs[index].indexOf(element) > -1) {
                        paragraphsIndexes.push(index + 1);
                    }
                }
            });
        }

        for (let index = paragraphsIndexes.length - 1; index >= 0; index--) {
            const paragraph = await this.paragraphProvider.GetParagraph();
            paragraphs.splice(paragraphsIndexes[index], 0, paragraph)
        }
    
        return await this.textProcessor.Process(paragraphs.join('\n'));
    }
}