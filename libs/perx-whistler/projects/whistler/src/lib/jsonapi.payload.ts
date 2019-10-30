export interface IJsonApiListPayload<T, S = any> {
  data: IJsonApiItem<T>[];
  included?: IJsonApiItem<S>[];
  meta?: IMeta;
}

export interface IMeta {
  record_count?: number;
  page_count?: number;
}

export interface IJsonApiItemPayload<T, S = any> {
  data: IJsonApiItem<T>;
  included?: IJsonApiItem<S>[];
}

export interface IJsonApiItem<T> {
  id: string;
  type: string;
  links: {
    self: string;
  };
  attributes: T;
  relationships?: {
    [source: string]: {
      links: {
        self: string;
        related: string;
      },
      data?: {
        id: string;
        type: string;
      }[]
    }
  };
}

export interface IJsonApiPatchItem<T> {
  data: IJsonApiPatchData<T>;
}

export interface IJsonApiPatchData<T> {
  attributes?: Partial<T>;
  id: string;
  type: string;
  relationships?: any;
}

export interface IJsonApiPostItem<T> {
  data: IJsonApiPostData<T>;
}

export interface IJsonApiPostData<T> {
  type?: string;
  attributes: T;
  relationships?: any;
}
