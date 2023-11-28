import { PrismaPetPhotosRepository } from '@/repositories/prisma/prisma-pet-photos-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { SetPhotosUseCase } from '@/use-cases/use-cases/pet-photos/set-photos-use-case'

export function makeSetPhotosUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const petPhotosRepository = new PrismaPetPhotosRepository()
  const setPhotosUseCase = new SetPhotosUseCase(
    petsRepository,
    petPhotosRepository,
  )
  return setPhotosUseCase
}
