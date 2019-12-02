export enum Type {
  Add = 'Add',
  Edit = 'Edit',
}

export interface IUpsertUserPopupData {
  type: Type;
  formData?: any;
}

export interface IUpsertUserPopup {
  panelClass: string;
  data: IUpsertUserPopupData;
}
