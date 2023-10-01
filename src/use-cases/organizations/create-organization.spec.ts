import { describe, it, beforeEach, expect } from 'vitest'
import { CreateOrganizationUseCase } from './create-organization'
import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { UserAlreadyExistsError } from '../errors/user-already-exists'
import { PhoneNumberIsAlreadyUsedError } from '../errors/phone-number-is-already-used'

describe('Create Organization Use Case', () => {
  let organizationsRepository: OrganizationsRepository
  let sut: CreateOrganizationUseCase

  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new CreateOrganizationUseCase(organizationsRepository)
  })

  it('should be able to create organization', async () => {
    const { organization } = await sut.execute({
      name: 'Pet Help',
      city: 'Mongaguá',
      state: 'São Paulo',
      address: 'Av São Paulo, 876',
      responsibleName: 'Carlos Robson',
      email: 'contato@pethelp.org',
      mobilePhoneNumber: '13111112222',
      postalCode: '11730000',
      password: 'pethelper50',
    })
    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to create organization with same e-mail', async () => {
    await sut.execute({
      name: 'Pet Help',
      city: 'Mongaguá',
      state: 'São Paulo',
      address: 'Av São Paulo, 876',
      responsibleName: 'Carlos Robson',
      email: 'contato@pethelp.org',
      mobilePhoneNumber: '13111112222',
      postalCode: '11730000',
      password: 'pethelper50',
    })
    await expect(() =>
      sut.execute({
        name: 'Animal Pal',
        city: 'Mongaguá',
        state: 'São Paulo',
        address: 'Av Marina, 999',
        responsibleName: 'Marcos Janeiro',
        email: 'contato@pethelp.org',
        mobilePhoneNumber: '13777778888',
        postalCode: '11730000',
        password: 'palpassword',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should not be able to create organization with same mobile phone number', async () => {
    await sut.execute({
      name: 'Pet Help',
      city: 'Mongaguá',
      state: 'São Paulo',
      address: 'Av São Paulo, 876',
      responsibleName: 'Carlos Robson',
      email: 'contato@pethelp.org',
      mobilePhoneNumber: '13111112222',
      postalCode: '11730000',
      password: 'pethelper50',
    })
    await expect(() =>
      sut.execute({
        name: 'Animal Pal',
        city: 'Mongaguá',
        state: 'São Paulo',
        address: 'Av Marina, 999',
        responsibleName: 'Marcos Janeiro',
        email: 'contato@animalpal.org',
        mobilePhoneNumber: '13111112222',
        postalCode: '11730000',
        password: 'palpassword',
      }),
    ).rejects.toBeInstanceOf(PhoneNumberIsAlreadyUsedError)
  })
})
