import { PetPhoto } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { PetsRepository } from './../../repositories/pets-repository'
import { PetPhotosRepository } from '@/repositories/pet-photos-repository'

export interface SetPhotosUseCaseRequest {
  petId: string
  photos: string[]
}

export interface SetPhotosUseCaseReply {
  photos: PetPhoto[]
}

export class SetPhotosUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private petPhotosRepository: PetPhotosRepository,
  ) {}

  public async execute({
    petId,
    photos,
  }: SetPhotosUseCaseRequest): Promise<SetPhotosUseCaseReply> {
    const pet = await this.petsRepository.getById(petId)
    if (!pet) {
      throw new ResourceNotFoundError()
    }
    await this.petPhotosRepository.eraseAllByPetId(petId)
    const addedPhotos = await this.petPhotosRepository.setByPetId(
      petId,
      photos.map((photo) => {
        return {
          photo_url: photo,
          pet_id: petId,
        }
      }),
    )
    return {
      photos: addedPhotos,
    }
  }
}
