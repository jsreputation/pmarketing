import { EngagementType } from 'src/engagement/engagement.dto';

export interface IPostRequest<T> {
  data: {
    type: EngagementType,
    attributes: T;
  };
}

export interface IPatchRequest<T> {
  data: {
    id?: string;
    type: EngagementType,
    attributes: T;
  };
}
