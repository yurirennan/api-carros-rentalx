import Specification from "@modules/cars/infra/typeorm/entities/Specification";

import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from "../ISpecificationsRepository";

class SpecificationRepositoryInMemory implements ISpecificationsRepository {
  specifications: Specification[] = [];

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
    });

    this.specifications.push(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = this.specifications.find((specification) => {
      return specification.name === name;
    });

    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const allSpecifications = this.specifications.filter((specification) => {
      return ids.includes(specification.id);
    });

    return allSpecifications;
  }
}

export { SpecificationRepositoryInMemory };
