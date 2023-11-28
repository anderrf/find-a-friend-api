import { PetRequirement, Prisma } from '@prisma/client'

export interface PetRequirementsRepository {
  setByPetId(
    petId: string,
    requirements: Prisma.PetRequirementUncheckedCreateInput[],
  ): Promise<PetRequirement[]>
  eraseAllByPetId(petId: string): Promise<void>
  findAllByPetId(petId: string): Promise<PetRequirement[]>
}
