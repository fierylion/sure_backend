import { Request } from 'express'

export interface UserTypes {
  firstName: string
  lastName: string
  mobile: string
  email: string
  password?: string
  createJwtToken(): { accessToken: string; refreshToken: string }
  verifyPassword(enteredPassword: string): Promise<boolean>
}

export interface PaymentCallbackTypes {
  message: string
  user: any
  password: any
  clientId: any
  transactionstatus: string
  operator: string
  reference: string
  externalreference: string
  utilityref: string
  amount: string
  transid: string
  msisdn: string
  mnoreference: string
  submerchantAcc: any
  additionalProperties: AdditionalProperties
}

export interface AdditionalProperties {}


export interface CustomRequest extends Request {
  user: { id: string; email: string }
}
