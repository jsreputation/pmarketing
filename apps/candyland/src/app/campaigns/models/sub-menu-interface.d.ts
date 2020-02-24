export interface ISubMenu {
  titleGroup: string;
  groupMenu: ISubMenuItem[];
}

export interface ISubMenuItem {
  name: string;
  count: number;
  active: boolean;
}
