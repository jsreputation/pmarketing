export interface IUploadedFile {
  id: string;
  type: string;
  url: string;
  cdn?: string;
  name?: string;
  key?: string;
  created_at: string;
  updated_at: string;
}
