export interface IMenu {
  name: string;
  icon: string;
  link: string;
  open: boolean;
  sub?: IMenu;
  active?: boolean;
}
