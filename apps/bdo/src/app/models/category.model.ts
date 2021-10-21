export interface SubCategory {
  link?: string;
  label?: string;
  linkImage?:string,
  linkImageSelected?:string,
  selected?:boolean,
  cardType?:SubCategory[],
  code?:string
}

// TODO: Using perx-core category model instead of this model
export interface CategoryModel {
  id?: number;
  image?: string;
  title?: string;
  content?: string;
  subCategories?: SubCategory[];
  code?:string
}
export interface CategoryModelSelected {
  id?: number;
  image?: string;
  title?: string;
  content?: string;
  subCategories?: SubCategory[];
  code?:string;
  cardType?:SubCategory[];
}


