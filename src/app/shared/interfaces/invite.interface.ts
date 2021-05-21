export interface Invite {
  id: number,
  issuerId: number,
  issuerUsername: string,
  recipientId: number,
  recipientUsername: string,
  groupId: number,
  groupTitle: string,
  issuedAt: string,
  resolvedAt: string
}
