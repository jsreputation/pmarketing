export interface IWDocumentAttributes {
    urn: string;
    created_at: string;
    updated_at: string;
    transfer_map: string | null;
    target: string | null;
    column_map: string[];
    blob: IWDocumentBlob;
    platform_event_state: string | null;
    url: string;
    record_count?: number;
}

export interface IWDocumentBlob {
    id: number;
    key: string;
    filename: string;
    content_type: string;
    metadata: IWDocumentMetadata;
    byteSize: number;
    checksum: string;
    created_at: string;
}

interface IWDocumentMetadata {
    identified: boolean;
}
