declare interface IUploadedFile {
  id: string;
  type: string;
  url: string;
  cdn?: string;
  name?: string;
  key?: string;
  record_count?: number;
  created_at: string;
  updated_at: string;
}
