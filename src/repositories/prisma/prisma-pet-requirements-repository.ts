import { PetRequirement, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { PetRequirementsRepository } from '../pet-requirements-repository'

export class PrismaPetRequirementsRepository
  implements PetRequirementsRepository
{
  async setByPetId(
    petId: string,
    requirements: Prisma.PetRequirementUncheckedCreateInput[],
  ): Promise<PetRequirement[]> {
    await prisma.petRequirement.createMany({
      data: requirements.map((requirement) => {
        return {
          pet_id: petId,
          requirement: requirement.requirement,
        }
      }),
    })
    return await prisma.petRequirement.findMany({
      where: {
        pet_id: petId,
      },
    })
  }

  async eraseAllByPetId(petId: string): Promise<void> {
    await prisma.petRequirement.deleteMany({
      where: {
        pet_id: petId,
      },
    })
  }

  async findAllByPetId(petId: string): Promise<PetRequirement[]> {
    return await prisma.petRequirement.findMany({
      where: {
        pet_id: petId,
      },
    })
  }
}
