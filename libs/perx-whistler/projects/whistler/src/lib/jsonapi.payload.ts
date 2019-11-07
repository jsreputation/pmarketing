export interface IWJsonApiListPayload<T, S = any> {
  data: IWJsonApiItem<T>[];
  included?: IWJsonApiItem<S>[];
  meta?: IWMeta;
}

export interface IWMeta {
  record_count?: number;
  page_count?: number;
}

export interface IWJsonApiItemPayload<T, S = any> {
  data: IWJsonApiItem<T>;
  included?: IWJsonApiItem<S>[];
}

export interface IWJsonApiItem<T> {
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

export interface IWJsonApiPatchItem<T> {
  data: IWJsonApiPatchData<T>;
}

export interface IWJsonApiPatchData<T> {
  attributes?: Partial<T>;
  id: string;
  type: string;
  relationships?: any;
}

export interface IWJsonApiPostItem<T> {
  data: IWJsonApiPostData<T>;
}

export interface IWJsonApiPostData<T> {
  type?: string;
  attributes: T;
  relationships?: any;
}

