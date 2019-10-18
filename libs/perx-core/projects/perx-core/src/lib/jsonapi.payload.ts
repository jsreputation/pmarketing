export interface IJsonApiListPayload<T> {
    data: IJsonApiItem<T>[];
    meta?: IMeta;
}

export interface IMeta {
  record_count?: number;
  page_count?: number;
}

export interface IJsonApiItemPayload<T> {
    data: IJsonApiItem<T>;
}

export interface IJsonApiItem<T> {
    id: string;
    type: string;
    links: {
        self: string;
    };
    attributes: T;
    relationships?: {
        source: {
            links: {
                self: string;
                related: string;
            }
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
