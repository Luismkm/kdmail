export default interface ILogsErrorRepository {
  create(cod: string, error: string): Promise<void>;
}
