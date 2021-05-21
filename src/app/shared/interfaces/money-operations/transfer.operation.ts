export interface TransferOperation {
  amount: number,
  comment: string,
  fromPurseId: number,
  toPurseId: number,
  userId: number
}
