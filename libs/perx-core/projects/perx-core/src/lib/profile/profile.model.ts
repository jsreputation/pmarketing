export interface IProfile {
  id: number;
  state: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  phone?: string;
  email?: string;
  birthDate?: string;
  gender?: string;
  joinedDate?: string;
  passwordExpiryDate?: string;
  personalProperties?: IPersonalProperties;
}

export interface IPersonalProperties {
  [key: string]: string | number;
}

export interface ICustomProperties {
  [key: string]: string | number;
}
