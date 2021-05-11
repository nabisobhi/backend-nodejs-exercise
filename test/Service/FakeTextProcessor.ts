import ITextProcessor from "../../src/Service/Common/ITextProcessor";

export default class FakeTextProcessor implements ITextProcessor {

    public constructor() {

    }

    public async Process(text: string): Promise<string> {
        return text;        
    }
}