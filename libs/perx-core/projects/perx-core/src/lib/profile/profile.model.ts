export interface IProfile {
  first_name: string;
  last_name: string;
  code: string;
  last4: string;
}

export interface IProfileResponse {
  data: IProfile;
}
