import { describe, it, beforeEach, expect } from 'vitest'
import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { RegisterPetUseCase } from './register-pet'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'

describe('Register Pet Use Case', () => {
  let organizationsRepository: OrganizationsRepository
  let petsRepository: PetsRepository
  let sut: RegisterPetUseCase

  beforeEach(async () => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    await organizationsRepository.create({
      id: 'org-01',
      name: 'Pet Help',
      city: 'Mongaguá',
      state: 'São Paulo',
      address: 'Av São Paulo, 876',
      responsible_name: 'Carlos Robson',
      email: 'contato@pethelp.org',
      mobile_phone_number: '13111112222',
      postal_code: '11730000',
      password_hash: 'pethelper50',
    })
    await organizationsRepository.create({
      id: 'org-02',
      name: 'Animal Pal',
      city: 'Mongaguá',
      state: 'São Paulo',
      address: 'Av Marina, 999',
      responsible_name: 'Marcos Janeiro',
      email: 'contato@animalpal.org',
      mobile_phone_number: '13111112222',
      postal_code: '11730000',
      password_hash: 'palpassword',
    })
    petsRepository = new InMemoryPetsRepository(organizationsRepository)
    sut = new RegisterPetUseCase(petsRepository)
  })

  it('should be able to register pet', async () => {
    const { pet } = await sut.execute({
      name: 'Nina',
      species: 'Dog',
      size: 2,
      requiredSpace: 2,
      age: 3,
      energyLevel: 2,
      description: 'Black and white dog',
      independenceLevel: 1,
      organizationId: 'org-01',
    })
    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to register pet with invalid organization id', async () => {
    await expect(() =>
      sut.execute({
        name: 'Nina',
        species: 'Dog',
        size: 2,
        requiredSpace: 2,
        age: 3,
        energyLevel: 2,
        description: 'Black and white dog',
        independenceLevel: 1,
        organizationId: 'org-10',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
