export interface SubCategory {
  link: string;
  label: string;
}

// TODO: Using perx-core category model instead of this model
export interface CategoryModel {
  id?: number;
  image: string;
  title: string;
  content: string;
  subCategories: SubCategory[];
}


