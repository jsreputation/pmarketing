export const enum PUserState {
  active = 'active',
  inactive = 'inactive',
  locked = 'locked'
}

export interface IPUser {
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

export interface IPUSers {
  data: IPUser[];
  meta: {
    count: number;
    size: number;
    total_pages: number;
    page: number;
  };
}
