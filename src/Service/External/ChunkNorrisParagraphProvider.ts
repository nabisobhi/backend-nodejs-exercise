import IParagraphProvider from "../Common/IParagraphProvider";

global.fetch = require("node-fetch");

export default class ChunkNorrisParagraphProvider implements IParagraphProvider {
    apiUrl: string;

    public constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
    }

    public async GetParagraph(): Promise<string> {
        const response = await fetch(this.apiUrl);
        const data = await response.json();
        return data.value;
    }
}
