export interface IHashGenerate {
  hashGenerate(payload: string): Promise<string>;
}
