export interface IJsonApiListPayload<T> {
    data: IJsonApiItem<T>[];
    meta?: {
        record_count?: number;
        page_count?: number;
    };
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
