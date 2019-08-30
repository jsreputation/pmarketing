export interface ISignUpData {
    firstName?: string;
    lastName: string;
    middleName?: string;
    phone: string;
    email?: string;
    birthDay?: string;
    gender?: string;
    password: string;
    password_confirmation: string;
}

export interface IMessageResponse {
    message: string;
    code?: number;
}

export interface IResetPasswordData {
    phone: string;
    newPassword: string;
    otp: string;
    passwordConfirmation: string;
}

export interface IAppAccessTokenResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    created_at: number;
}

export interface IChangePasswordData {
    newPassword: string;
    passwordConfirmation: string;
    otp: string;
}

export interface ILoginResponse {
    bearer_token?: string;
}
