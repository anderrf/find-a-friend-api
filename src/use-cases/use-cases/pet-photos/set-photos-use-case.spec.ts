import { PetPhotosRepository } from '@/repositories/pet-photos-repository'
import { PetsRepository } from '../../../repositories/pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { InMemoryPetPhotosRepository } from '@/repositories/in-memory/in-memory-pet-photos-repository'
import { SetPhotosUseCase } from './set-photos-use-case'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'

describe('Set Photos Use Case', () => {
  let organizationsRepository: OrganizationsRepository
  let petsRepository: PetsRepository
  let petPhotosRepository: PetPhotosRepository
  let sut: SetPhotosUseCase

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
    petPhotosRepository = new InMemoryPetPhotosRepository()
    sut = new SetPhotosUseCase(petsRepository, petPhotosRepository)
  })

  it('should be able to set photos to registered pet', async () => {
    const { photos } = await sut.execute({
      petId: 'pet-01',
      photos: [
        'http://pet-photo.com/photo-01',
        'http://pet-photo.com/photo-02',
      ],
    })
    expect(photos).toEqual(
      expect.objectContaining([
        expect.objectContaining({
          pet_id: 'pet-01',
          photo_url: expect.any(String),
        }),
        expect.objectContaining({
          pet_id: 'pet-01',
          photo_url: expect.any(String),
        }),
      ]),
    )
    expect(photos).toHaveLength(2)
  })

  it('should be not able to set photos to non-registered pet', async () => {
    await expect(() =>
      sut.execute({
        petId: 'pet-03',
        photos: [
          'http://pet-photo.com/photo-01',
          'http://pet-photo.com/photo-02',
        ],
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should be able to set update photos to registered pet', async () => {
    await sut.execute({
      petId: 'pet-01',
      photos: [
        'http://pet-photo.com/photo-01',
        'http://pet-photo.com/photo-02',
      ],
    })
    const { photos } = await sut.execute({
      petId: 'pet-01',
      photos: ['http://pet-photo.com/photo-07'],
    })
    expect(photos).toEqual(
      expect.objectContaining([
        expect.objectContaining({
          pet_id: 'pet-01',
          photo_url: expect.any(String),
        }),
      ]),
    )
    expect(photos).toHaveLength(1)
  })
})
