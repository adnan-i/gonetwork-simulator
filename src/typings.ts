export type KeyType = 'private' | 'public'

export interface EthAccount {
  address: string
  amount: number

  // todo: discuss details
  name?: string
  isLocked?: boolean
  privateKey?: string

  lastModified?: Date
}

export type MockConfig = {
  probabilityOfKey: number
  waitForMs: number
}
