import { Prisma, Organization } from '@prisma/client'
import { OrganizationsRepository } from '../organizations-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  public items: Organization[] = []

  async create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
    const newItemsLength = this.items.push({
      ...data,
      id: data.id || randomUUID(),
    })
    return this.items[newItemsLength - 1]
  }

  async findById(id: string): Promise<Organization | null> {
    const organization = this.items.find((item) => item.id === id)
    return organization || null
  }

  async findByEmail(email: string): Promise<Organization | null> {
    const organization = this.items.find((item) => item.email === email)
    return organization || null
  }

  async findByMobilePhoneNumber(
    mobilePhoneNumber: string,
  ): Promise<Organization | null> {
    const organization = this.items.find(
      (item) => item.mobile_phone_number === mobilePhoneNumber,
    )
    return organization || null
  }

  async findManyByCityAndState(
    city: string,
    state: string,
    page = 1,
  ): Promise<Organization[]> {
    return this.items
      .filter((item) => item.city === city && item.state === state)
      .slice((page - 1) * 20, page * 20)
  }
}
