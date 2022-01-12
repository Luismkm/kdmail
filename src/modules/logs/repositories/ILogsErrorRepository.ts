export default interface ILogsErrorRepository {
  create(cod: string, error: string, email: string): Promise<void>;
}
