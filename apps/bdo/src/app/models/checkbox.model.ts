export interface CheckboxModel {
  name: string;
  selected: boolean;
  type?:string;
  children?: CheckboxModel[];
}
