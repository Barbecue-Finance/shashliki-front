import {IUser} from "./user.interface";

export interface IGroup {
  id: number,
  title: string,
  users: IUser[]
}
