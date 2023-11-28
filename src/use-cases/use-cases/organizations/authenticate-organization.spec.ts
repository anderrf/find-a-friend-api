import { describe, it, beforeEach, expect } from 'vitest'
import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { AuthenticateOrganizationUseCase } from './authenticate-organization'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '../../errors/invalid-credentials-error'

describe('Authenticate Organization Use Case', () => {
  let organizationsRepository: OrganizationsRepository
  let sut: AuthenticateOrganizationUseCase

  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new AuthenticateOrganizationUseCase(organizationsRepository)
  })

  it('should be able to authenticate organization', async () => {
    await organizationsRepository.create({
      name: 'Pet Help',
      city: 'Mongaguá',
      state: 'São Paulo',
      address: 'Av São Paulo, 876',
      responsible_name: 'Carlos Robson',
      email: 'contato@pethelp.org',
      mobile_phone_number: '13111112222',
      postal_code: '11730000',
      password_hash: await hash('pethelper50', 6),
    })
    const { organization } = await sut.execute({
      email: 'contato@pethelp.org',
      password: 'pethelper50',
    })
    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate organization with wrong e-mail', async () => {
    await organizationsRepository.create({
      name: 'Pet Help',
      city: 'Mongaguá',
      state: 'São Paulo',
      address: 'Av São Paulo, 876',
      responsible_name: 'Carlos Robson',
      email: 'contato@pethelp.org',
      mobile_phone_number: '13111112222',
      postal_code: '11730000',
      password_hash: await hash('pethelper50', 6),
    })
    await expect(() =>
      sut.execute({
        email: 'contato@animalpal.org',
        password: 'pethelper50',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate organization with wrong password', async () => {
    await organizationsRepository.create({
      name: 'Pet Help',
      city: 'Mongaguá',
      state: 'São Paulo',
      address: 'Av São Paulo, 876',
      responsible_name: 'Carlos Robson',
      email: 'contato@pethelp.org',
      mobile_phone_number: '13111112222',
      postal_code: '11730000',
      password_hash: await hash('pethelper50', 6),
    })
    await expect(() =>
      sut.execute({
        email: 'contato@pethelp.org',
        password: 'palpassword',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
