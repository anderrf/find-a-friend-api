import { Organization, Prisma } from '@prisma/client'
import { OrganizationsRepository } from '../organizations-repository'
import { prisma } from '@/lib/prisma'

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  async create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
    return await prisma.organization.create({
      data: {
        ...data,
        role: 'ORG',
      },
    })
  }

  async findById(id: string): Promise<Organization | null> {
    return await (prisma.organization.findUnique({
      where: {
        id,
      },
    }) || null)
  }

  async findByEmail(email: string): Promise<Organization | null> {
    return await (prisma.organization.findUnique({
      where: {
        email,
      },
    }) || null)
  }

  async findByMobilePhoneNumber(
    mobilePhoneNumber: string,
  ): Promise<Organization | null> {
    return await (prisma.organization.findUnique({
      where: {
        mobile_phone_number: mobilePhoneNumber,
      },
    }) || null)
  }

  async findManyByCityAndState(
    city: string,
    state: string,
    page: number | undefined = 1,
  ): Promise<Organization[]> {
    return await prisma.organization.findMany({
      where: {
        city,
        state,
      },
      take: 30,
      skip: (page - 1) * 30,
    })
  }

  async findAllByCityAndState(
    city: string,
    state: string,
  ): Promise<Organization[]> {
    return await prisma.organization.findMany({
      where: {
        city,
        state,
      },
    })
  }
}
