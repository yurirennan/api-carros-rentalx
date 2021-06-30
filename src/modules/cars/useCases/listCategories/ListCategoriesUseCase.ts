import { inject, injectable } from "tsyringe";

import Category from "@modules/cars/entities/Category";
import { ICategoriesRespository } from "@modules/cars/repositories/ICategoriesRespository";

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRespository
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.list();
    return categories;
  }
}

export default ListCategoriesUseCase;
