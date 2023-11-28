import { PetsRepository } from './../pets-repository'
import { PetRequirementsRepository } from '@/repositories/pet-requirements-repository'
import { PetRequirement, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryPetRequirementsRepository
  implements PetRequirementsRepository
{
  public items: PetRequirement[] = []

  async setByPetId(
    petId: string,
    requirements: Prisma.PetRequirementUncheckedCreateInput[],
  ): Promise<PetRequirement[]> {
    this.items.push(
      ...requirements.map((requirement) => {
        return {
          requirement: requirement.requirement,
          pet_id: petId,
          id: requirement?.id ? requirement.id : randomUUID(),
        }
      }),
    )
    return [...this.items.filter((item) => item.pet_id === petId)]
  }

  async eraseAllByPetId(petId: string): Promise<void> {
    this.items = this.items.filter((item) => item.pet_id !== petId)
  }

  async findAllByPetId(petId: string): Promise<PetRequirement[]> {
    return [...this.items.filter((item) => item.pet_id === petId)]
  }
}
