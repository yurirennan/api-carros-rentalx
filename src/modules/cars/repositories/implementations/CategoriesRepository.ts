import Category from "../../model/Category";
import {
  ICategoriesRespository,
  ICreateCategoryDTO,
} from "../ICategoriesRespository";

class CategoriesRepository implements ICategoriesRespository {
  private categories: Category[];

  public static instance: CategoriesRepository;

  private constructor() {
    this.categories = [];
  }

  public static getInstance(): CategoriesRepository {
    if (!this.instance) {
      this.instance = new CategoriesRepository();
    }

    return this.instance;
  }

  create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(category);
  }

  list(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category {
    const category = this.categories.find((category) => {
      return category.name === name;
    });

    return category;
  }
}

export default CategoriesRepository;
