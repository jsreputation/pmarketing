export enum BaseType {
    text = 'type/Text',
    integer = 'type/Integer'
}

export interface IData {
    columns: string[];
    cols: {
        name: string;
        display_name: string;
        base_type: BaseType;
        source: string;
    }[];
    rows: any[][];
    insights: any;
}
