export enum BASE_TYPE {
    text = 'type/Text',
    integer = 'type/Integer'
}

export interface IData {
    columns: string[];
    cols: {
        name: string;
        display_name: string;
        base_type: BASE_TYPE;
        source: string;
    }[];
    rows: any[][];
    insights: any;
}
