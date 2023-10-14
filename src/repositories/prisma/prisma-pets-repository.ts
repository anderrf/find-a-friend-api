import { Organization, Pet, Prisma } from '@prisma/client'
import { PetsRepository, SearchManyPetsParams } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    return await prisma.pet.create({ data })
  }

  async searchManyByCityAndState(
    {
      city,
      state,
      energyLevel,
      age,
      size,
      species,
      requiredSpace,
    }: SearchManyPetsParams,
    page: number | undefined = 1,
  ): Promise<Pet[]> {
    return await prisma.pet.findMany({
      where: {
        organization: {
          state,
          city,
        },
        age,
        size,
        species,
        energy_level: energyLevel,
        required_space: requiredSpace,
      },
      take: 30,
      skip: (page - 1) * 30,
    })
  }

  async searchAllByCityAndState({
    city,
    state,
    energyLevel,
    age,
    size,
    species,
    requiredSpace,
  }: SearchManyPetsParams): Promise<Pet[]> {
    return await prisma.pet.findMany({
      where: {
        organization: {
          state,
          city,
        },
        age,
        size,
        species,
        energy_level: energyLevel,
        required_space: requiredSpace,
      },
    })
  }

  async getById(id: string): Promise<Pet | null> {
    return (
      (await prisma.pet.findUnique({
        where: {
          id,
        },
      })) || null
    )
  }

  async markAsAdoptedById(id: string): Promise<Pet> {
    return await prisma.pet.update({
      data: {
        adopted_at: new Date(),
        is_active: false,
      },
      where: {
        id,
      },
    })
  }

  async activateById(id: string): Promise<Pet> {
    return await prisma.pet.update({
      data: {
        is_active: true,
      },
      where: {
        id,
      },
    })
  }

  async deactivateById(id: string): Promise<Pet> {
    return await prisma.pet.update({
      data: {
        is_active: false,
      },
      where: {
        id,
      },
    })
  }

  async findOrganizationByOrganizationId(
    id: string,
  ): Promise<Organization | null> {
    return (
      (await prisma.pet
        .findFirst({
          where: {
            organization_id: id,
          },
        })
        .organization()) || null
    )
  }

  async findOrganizationByPetId(id: string): Promise<Organization | null> {
    return (
      (await prisma.pet
        .findUnique({
          where: {
            id,
          },
        })
        .organization()) || null
    )
  }
}
