import BoldTextProcessor from "./Service/BoldTextProcessor";
import ChunkNorrisParagraphProvider from "./Service/External/ChunkNorrisParagraphProvider";
import FormatTextProcessor from "./Service/FormatTextProcessor";
import ITextProcessor from "./Service/Common/ITextProcessor";
import ItalicTextProcessor from "./Service/ItalicTextProcessor";
import ReplacementTextProcessor from "./Service/ReplacementTextProcessor";
import ConditionalInsertParagraphTextProcessor from "./Service/ConditionalInsertParagraphTextProcessor";
import LineFormatter from "./Service/LineFormatter";

const inputText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet lacus eu purus malesuada sodales. Nunc a risus nunc.\nPraesent eget volutpat eros. Fusce mollis gravida nunc, vitae accumsan ligula varius vitae. Duis in tellus non est pulvinar efficitur quis ac tortor. Aliquam dictum, magna quis venenatis pharetra, leo sapien mollis mauris, et vestibulum arcu est eget turpis. Etiam tortor erat, lacinia et faucibus vitae, maximus et elit.\nDonec nisl nisi, imperdiet vitae felis ut, maximus condimentum ante. Curabitur efficitur sem sed ligula eleifend varius. Mauris et risus quis libero mattis auctor id ut orci.\nAliquam cursus sapien et euismod vestibulum. In maximus dolor eu vulputate tempus. Aenean ultricies nisl id elit mattis, vitae finibus libero interdum. Vestibulum ornare quam nec ornare fermentum.';
const inputConfig : any = { 
    LineWidth: 80,
    TextAlignment: 'left',
    Spacing: 'single',
    BoldStrings: ['Aliquam', 'Mauris'],
    ItalicStrings: ['elit'],
    ReplaceStrings: [['cursus', 'CURSUS'], ['lacinia', 'malesuada nunc']],
    ChuckNorrisFoodFactStrings: ['tortor', 'fames'],
}

async function processText(text: string, config: any): Promise<string> {
    const lineFormatter = new LineFormatter();
    let formatTextProcessor = new FormatTextProcessor(lineFormatter, config.LineWidth, config.TextAlignment, config.Spacing) as ITextProcessor
    formatTextProcessor = new ReplacementTextProcessor(formatTextProcessor, config.ReplaceStrings)
    formatTextProcessor = new BoldTextProcessor(formatTextProcessor, config.BoldStrings)
    formatTextProcessor = new ItalicTextProcessor(formatTextProcessor, config.ItalicStrings)
    formatTextProcessor = new ConditionalInsertParagraphTextProcessor(formatTextProcessor, config.ChuckNorrisFoodFactStrings,
        new ChunkNorrisParagraphProvider('https://api.chucknorris.io/jokes/random'))

    let processedText = await formatTextProcessor.Process(text);
    
    return processedText;
}

let processedText = processText(inputText, inputConfig);

processedText.then(r => { 
    r.split('\n').forEach(el => { console.log(el)})
})