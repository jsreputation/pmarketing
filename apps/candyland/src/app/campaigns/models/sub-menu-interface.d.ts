declare interface ISubMenu {
  titleGroup: string;
  groupMenu: ISubMenuItem[];
}

declare interface ISubMenuItem {
  name: string;
  count: number;
  active: boolean;
}
