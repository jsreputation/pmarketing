declare interface IVouchersApi {
    type: any;
    attributes: {
        amount: number;
        start_date: string;
        source_type?: any;
        source_id: number;
        code_type: string;
        code?: string;
        prefix?: string;
        length?: number;
        format_type?: string;
    };
}
