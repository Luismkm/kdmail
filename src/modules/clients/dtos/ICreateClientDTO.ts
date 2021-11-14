interface IData {
  cod: string;
  email: string;
}
export default interface ICreateClientDTO {
  clients: IData[];
}
