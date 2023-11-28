import { PetPhotosRepository } from '@/repositories/pet-photos-repository'
import { PetPhoto, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { PetsRepository } from '../pets-repository'

export class InMemoryPetPhotosRepository implements PetPhotosRepository {
  public items: PetPhoto[] = []

  async setByPetId(
    petId: string,
    photos: Prisma.PetPhotoUncheckedCreateInput[],
  ): Promise<PetPhoto[]> {
    this.items.push(
      ...photos.map((photo) => {
        return {
          photo_url: photo.photo_url,
          pet_id: petId,
          id: photo?.id ? photo.id : randomUUID(),
        }
      }),
    )
    return [...this.items.filter((item) => item.pet_id === petId)]
  }

  async eraseAllByPetId(petId: string): Promise<void> {
    this.items = this.items.filter((item) => item.pet_id !== petId)
  }

  async findAllByPetId(petId: string): Promise<PetPhoto[]> {
    return [...this.items.filter((item) => item.pet_id === petId)]
  }
}
