export interface IProfile {
  id: number;
  state: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  phone?: string;
  email?: string;
  birthDate?: Date;
  gender?: string;
  joinedDate?: string;
  passwordExpiryDate?: string;
  customProperties?: ICustomProperties;
}

export interface ICustomProperties {
  [key: string]: string | number;
}

export interface IProfileProperty {
  state?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  email?: string;
  birthDate?: Date;
  gender?: string;
}
