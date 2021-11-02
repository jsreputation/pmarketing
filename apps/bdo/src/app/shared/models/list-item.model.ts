import { ICategoryTags } from "@perxtech/core";

export interface IListItemModel {
  id?:number;
  thumbnail:string;
  categoryTags:ICategoryTags[];
  name:string;
  description:string;
  createdAt: Date | string;
  position?: string;
} 