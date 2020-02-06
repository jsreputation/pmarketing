export const enum PUserState {
  active = 'active',
  inactive = 'inactive',
  locked = 'locked'
}

export interface IPUserItem {
  id: number;
  email: string;
  name: string;
  roles: {
    id: number;
    name: string
  }[];
  state: PUserState;
  is_locked: boolean;
}

export interface IPUsers {
  data: IPUserItem[];
  meta: {
    count: number;
    size: number;
    total_pages: number;
    page: number;
  };
}

export interface IPPostUser {
  email: string;
  role_ids: number[];
}

export interface IPUser {
  data: IPUserItem;
}
