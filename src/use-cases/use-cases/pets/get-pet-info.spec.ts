import { describe, it, beforeEach, expect } from 'vitest'
import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPetInfoUseCase } from './get-pet-info'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'

describe('Get Pet Info Use Case', () => {
  let organizationsRepository: OrganizationsRepository
  let petsRepository: PetsRepository
  let sut: GetPetInfoUseCase

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
    await petsRepository.create({
      id: 'pet-01',
      name: 'Nina',
      species: 'Dog',
      size: 2,
      required_space: 2,
      age: 3,
      energy_level: 2,
      description: 'Black and white dog',
      independence_level: 1,
      organization_id: 'org-01',
    })
    sut = new GetPetInfoUseCase(petsRepository)
  })

  it('should be able to get info from registered pet', async () => {
    const { pet } = await sut.execute({ petId: 'pet-01' })
    expect(pet).toEqual(
      expect.objectContaining({
        id: 'pet-01',
        name: 'Nina',
      }),
    )
  })

  it('should not be able to get info from non-registered pet', async () => {
    await expect(() =>
      sut.execute({
        petId: 'pet-06',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
