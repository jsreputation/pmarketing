declare interface IVouchersApi {
    amount: number;
    start_date: string;
    source_type?: string;
    source_id: number;
    code_type: string;
    file_url?: string;
    code?: string;
    prefix?: string;
    length?: number;
    format_type?: string;
}
