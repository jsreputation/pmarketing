export interface IAudiencesUserForm {
  id?: string;
  pi?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  birthday: Date;
  race: string;
  country: string;
  nationality: string;
  city: string;
  state: string;
  audienceList: string[];
  file: string;
}
