export interface IJsonApiListPayload<T> {
    data: IJsonApiItem<T>[];
}

export interface IJsonApiItemPayload<T> {
    data: IJsonApiItem<T>;
}

export interface IJsonApiItem<T> {
    id: string | number;
    type: string;
    links: {
        self: string;
    };
    attributes: T;
    relationships: {
        source: {
            links: {
                self: string;
                related: string;
            }
        }
    };
}
