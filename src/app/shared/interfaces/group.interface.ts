import UserDto from "./dto/user-dto.interface";

export default interface GroupDto {
  id: number,
  title: string,
  purseId: number,
  users: UserDto[]
}
