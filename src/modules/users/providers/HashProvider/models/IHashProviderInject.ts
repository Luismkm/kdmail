export interface IHashProviderInject {
  hashCompare(paylaod: string, hashed: string): Promise<boolean>;
  hashGenerate(payload: string): Promise<string>;
}
