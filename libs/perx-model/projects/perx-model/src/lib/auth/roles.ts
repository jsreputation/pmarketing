import { IPPermission } from './authorizations';

export interface IPRoles {
  data: IPRole[];
  meta: {
    count: number;
    size: number;
    page: number;
    current_page: number;
    per_page: number;
    prev_page: null
    next_page: null
    total_pages: number;
    total_count: number;
  };
}

export interface IPPostRole {
  name: string;
  permissions: IPPermission[];
}

export interface IPPostRoleResponse {
  data: IPRole;
}

export interface IPRole {
  id: number;
  name: string;
  permissions: IPPermission[];
}
