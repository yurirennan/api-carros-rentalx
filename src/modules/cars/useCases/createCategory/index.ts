import CategoriesRepository from "../../repositories/implementations/CategoriesRepository";
import CreateCategoryControlller from "./CreateCategoryController";
import CreateCategoryUseCase from "./CreateCategoryUseCase";

const categoriesRepository = CategoriesRepository.getInstance();

const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);

const createCategoryControlller = new CreateCategoryControlller(
  createCategoryUseCase
);

export default createCategoryControlller;
