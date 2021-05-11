export default interface ITextProcessor {
  Process(text: string): Promise<string>
}