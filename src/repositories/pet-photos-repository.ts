import { PetPhoto, Prisma } from '@prisma/client'

export interface PetPhotosRepository {
  setByPetId(
    petId: string,
    photos: Prisma.PetPhotoUncheckedCreateInput[],
  ): Promise<PetPhoto[]>
  eraseAllByPetId(petId: string): Promise<void>
  findAllByPetId(petId: string): Promise<PetPhoto[]>
}
