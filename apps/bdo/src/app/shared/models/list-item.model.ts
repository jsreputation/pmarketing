import { ICategoryTags, ITag } from '@perxtech/core';

export interface IListItemModel {
  id?: number;
  thumbnail: string;
  categoryTags: ICategoryTags[];
  name: string;
  description: string;
  createdAt: Date | string;
  documentType?: string;
  position?: string;
  tags: ITag[];
  score?: number;
  featuredImg?: string;
} 
