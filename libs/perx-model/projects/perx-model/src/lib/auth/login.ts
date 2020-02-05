export interface IPLoginRequest {
  email: string;
  password: string;
}

export interface IPLoginResonse {
  bearer_token: string;
  password_expires_at: null;
}
