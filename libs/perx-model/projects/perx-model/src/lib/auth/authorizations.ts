export const enum PPermissionActions {
  view = 'view',
  edit = 'edit'
}

export interface IPPermission {
  resource_name: string;
  actions: PPermissionActions[];
  restricted_actions: any[];
  restricted_fields: any[];
}

export interface IPAuthorizations {
  data: {
    permissions: IPPermission[];
  };
  meta: {
    updated_at: string;
  };
}
