interface IDataStatus {
  count: string;
  sended: 'Y' | 'N' | 'C';
}
export default interface IStatusDTO {
  status: IDataStatus[];
}
