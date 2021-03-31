import Category from "../../model/Category";
import { ICategoriesRespository } from "../../repositories/ICategoriesRespository";

class ListCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRespository) {}

  execute(): Category[] {
    return this.categoriesRepository.list();
  }
}

export default ListCategoriesUseCase;
