export interface ISignUpData {
    firstName?: string;
    lastName: string;
    middleName?: string;
    phone: string;
    email?: string;
    birthDay?: string;
    gender?: string;
    password: string;
    passwordConfirmation: string;
}

export interface IResetPasswordData {
    phone: string;
    newPassword: string;
    otp: string;
    passwordConfirmation: string;
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

export enum TokenType {
    local = 'local'
}
