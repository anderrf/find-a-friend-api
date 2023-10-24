import { PetRequirementsRepository } from '@/repositories/pet-requirements-repository'
import { PetsRepository } from '../../../repositories/pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { InMemoryPetRequirementsRepository } from '@/repositories/in-memory/in-memory-pet-requirements-repository'
import { SetRequirementsUseCase } from './set-requirements-use-case'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'

describe('Set Requirements Use Case', () => {
  let organizationsRepository: OrganizationsRepository
  let petsRepository: PetsRepository
  let petRequirementsRepository: PetRequirementsRepository
  let sut: SetRequirementsUseCase

  beforeEach(async () => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    petsRepository = new InMemoryPetsRepository(organizationsRepository)
    await petsRepository.create({
      id: 'pet-01',
      name: 'Nina',
      species: 'Dog',
      independence_level: 1,
      age: 3,
      energy_level: 2,
      required_space: 2,
      size: 2,
      organization_id: 'org-01',
    })
    petRequirementsRepository = new InMemoryPetRequirementsRepository()
    sut = new SetRequirementsUseCase(petsRepository, petRequirementsRepository)
  })

  it('should be able to set requirements to registered pet', async () => {
    const { requirements } = await sut.execute({
      petId: 'pet-01',
      requirements: ['Espaço limpo e aberto', 'Água fresca em abundância'],
    })
    expect(requirements).toEqual(
      expect.objectContaining([
        expect.objectContaining({
          pet_id: 'pet-01',
          requirement: expect.any(String),
        }),
        expect.objectContaining({
          pet_id: 'pet-01',
          requirement: expect.any(String),
        }),
      ]),
    )
    expect(requirements).toHaveLength(2)
  })

  it('should be not able to set requirements to non-registered pet', async () => {
    await expect(() =>
      sut.execute({
        petId: 'pet-03',
        requirements: ['Espaço limpo e aberto', 'Água fresca em abundância'],
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should be able to set update requirements to registered pet', async () => {
    await sut.execute({
      petId: 'pet-01',
      requirements: ['Espaço limpo e aberto', 'Água fresca em abundância'],
    })
    const { requirements } = await sut.execute({
      petId: 'pet-01',
      requirements: ['Ração adequada para cão de maior idade'],
    })
    expect(requirements).toEqual(
      expect.objectContaining([
        expect.objectContaining({
          pet_id: 'pet-01',
          requirement: expect.any(String),
        }),
      ]),
    )
    expect(requirements).toHaveLength(1)
  })
})
