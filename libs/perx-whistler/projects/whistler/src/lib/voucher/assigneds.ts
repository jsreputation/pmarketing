export enum AssignedStatus {
    issued = 'issued'
}

export interface IAssignedAttributes {
    assigned_to_id: number;
    code: string;
    created_at: string;
    end_date: string;
    source_id: number;
    source_type: string;
    start_date: string;
    status: AssignedStatus;
    updated_at: string;
    urn: string;
}

export interface IAssignRequestAttributes {
    assigned_to_id?: string;
    source_id: string;
    source_type: string;
}
