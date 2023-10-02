import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { Organization } from '@prisma/client'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

export interface AuthenticateOrganizationUseCaseRequest {
  email: string
  password: string
}

export interface AuthenticateOrganizationUseCaseReply {
  organization: Organization
}

export class AuthenticateOrganizationUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  public async execute({
    email,
    password,
  }: AuthenticateOrganizationUseCaseRequest): Promise<AuthenticateOrganizationUseCaseReply> {
    const organization = await this.organizationsRepository.findByEmail(email)
    if (!organization) {
      throw new InvalidCredentialsError()
    }
    const doesPasswordMatch = await compare(
      password,
      organization.password_hash,
    )
    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError()
    }
    return {
      organization,
    }
  }
}
