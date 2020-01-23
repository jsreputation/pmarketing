export interface ISignUpData {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  phone: string;
  email?: string;
  birthDay?: string;
  gender?: string;
  postcode?: string;
  title?: string;
  password: string;
  passwordConfirmation: string;
  anonymous?: boolean;
}

export interface IChangePasswordData {
  newPassword: string;
  passwordConfirmation: string;
  oldPassword: string;
  otp: string;
}

export interface IChangePhoneData {
  phone: string;
  otp: string;
}
