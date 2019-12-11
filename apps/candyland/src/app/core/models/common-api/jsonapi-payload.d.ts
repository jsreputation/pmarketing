declare interface IJsonApiListPayload<T> {
  data: IJsonApiItem<T>[];
  links?: any;
  meta?: IMeta;
  included?: any;
}

declare interface IJsonApiPayload<T> {
  data: IJsonApiItem<T>;
  included?: any;
}

declare type IJsonApiGenericPayload<T> = IJsonApiListPayload<T> | IJsonApiPayload<T>;

declare interface IJsonApiItem<T> {
  id?: string;
  type?: string;
  links?: {
    self: string;
  };
  attributes: T;
  relationships?: IJsonApiRelationships;
}

declare interface IJsonApiPatchItem<T> {
  data: IJsonApiPatchData<T>;
}

declare interface IJsonApiPatchData<T> {
  attributes?: Partial<T>;
  id?: string;
  type: string;
  relationships?: IJsonApiRelationships;
}

declare interface IJsonApiPostItem<T> {
  data: IJsonApiPostData<T>;
}

declare interface IJsonApiPostData<T> {
  id?: string;
  type?: string;
  attributes: T;
  relationships?: IJsonApiRelationships;
}

declare interface IJsonApiRelationships {
  [key: string]: any;

  source?: {
    links: {
      self: string; related: string;
    }
  };
}

declare interface IJsonApiSendItem<T> {
  data: IJsonApiSendData<T>;
}

declare type IJsonApiSendData<T> = IJsonApiPatchData<T> |  IJsonApiPostData<T>;

