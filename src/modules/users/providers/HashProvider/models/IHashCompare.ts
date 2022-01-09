export interface IHashCompare {
  hashCompare(paylaod: string, hashed: string): Promise<boolean>;
}
