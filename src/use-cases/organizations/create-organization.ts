import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { Organization } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from '../errors/user-already-exists'
import { PhoneNumberIsAlreadyUsedError } from '../errors/phone-number-is-already-used'

export interface CreateOrganizationUseCaseRequest {
  name: string
  responsibleName: string
  city: string
  state: string
  address: string
  postalCode: string
  email: string
  mobilePhoneNumber: string
  password: string
}

export interface CreateOrganizationUseCaseReply {
  organization: Organization
}

export class CreateOrganizationUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  public async execute({
    name,
    responsibleName,
    city,
    state,
    address,
    postalCode,
    email,
    mobilePhoneNumber,
    password,
  }: CreateOrganizationUseCaseRequest): Promise<CreateOrganizationUseCaseReply> {
    const organizationWithSameEmail =
      await this.organizationsRepository.findByEmail(email)
    if (organizationWithSameEmail) {
      throw new UserAlreadyExistsError()
    }
    const organizationWithSameMobilePhoneNumber =
      await this.organizationsRepository.findByMobilePhoneNumber(
        mobilePhoneNumber,
      )
    if (organizationWithSameMobilePhoneNumber) {
      throw new PhoneNumberIsAlreadyUsedError()
    }
    const organization = await this.organizationsRepository.create({
      name,
      responsible_name: responsibleName,
      city,
      state,
      address,
      postal_code: postalCode,
      email,
      mobile_phone_number: mobilePhoneNumber,
      password_hash: await hash(password, 6),
    })
    return {
      organization,
    }
  }
}
