import { validEmailPattern } from 'src/components/UserEmail/UserEmail'
import { Role } from './Role'
import { Status } from './Status'

export class User {
  readonly createdAt = new Date(Date.now())
  public id?: number
  readonly email: string
  readonly role: Role
  readonly state: Status
  constructor(email: string, role: string, status: string) {
    this.email = this.getValidEmail(email)
    this.role = this.getValidRole(role)
    this.state = this.getValidStatus(status)
  }

  public getValidEmail(email: string): string {
    return getValidEmail(email)
  }

  private getValidRole(role: string): Role {
    if (Role.CUIDADOR !== role && Role.TRATANTE !== role) {
      throw new Error('Role is invalid')
    }

    return Role.CUIDADOR === role ? Role.CUIDADOR : Role.TRATANTE
  }

  private getValidStatus(status: string): Status {
    if (Status.ACTIVO !== status && Status.INACTIVO !== status) {
      throw new Error('Status is invalid')
    }

    return Status.ACTIVO === status ? Status.ACTIVO : Status.INACTIVO
  }
}

export const getValidEmail = (email: string): string => {
  if (!email) {
    throw new Error('Email is empty')
  }

  if (!validEmailPattern.test(email)) {
    throw new Error('Email is invalid')
  }

  const emailParts = email.toLowerCase().split('@')
  const idEmail = emailParts[0].replace(/\./g, '')
  const emailDomain = emailParts[1]

  return `${idEmail}@${emailDomain}`
}
