export enum EntityType {
  engagements = 'engagements',
}

export interface IEntity<T> {
  id: string;
  type: EntityType;
  links: {
    self: string;
  };
  attributes: T;
  relationships: any;
}
