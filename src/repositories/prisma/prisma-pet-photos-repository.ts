import { PetPhoto, Prisma } from '@prisma/client'
import { PetPhotosRepository } from '../pet-photos-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetPhotosRepository implements PetPhotosRepository {
  async setByPetId(
    petId: string,
    photos: Prisma.PetPhotoUncheckedCreateInput[],
  ): Promise<PetPhoto[]> {
    await prisma.petPhoto.createMany({
      data: photos.map((photo) => {
        return {
          pet_id: petId,
          photo_url: photo.photo_url,
        }
      }),
    })
    return await prisma.petPhoto.findMany({
      where: {
        pet_id: petId,
      },
    })
  }

  async eraseAllByPetId(petId: string): Promise<void> {
    await prisma.petPhoto.deleteMany({
      where: {
        pet_id: petId,
      },
    })
  }

  async findAllByPetId(petId: string): Promise<PetPhoto[]> {
    return await prisma.petPhoto.findMany({
      where: {
        pet_id: petId,
      },
    })
  }
}
