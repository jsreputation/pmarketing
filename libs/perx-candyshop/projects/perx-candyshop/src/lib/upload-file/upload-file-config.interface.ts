import { IUploadFileService } from './upload-file-service.interface';

export interface IUploadFileConfig {
  service?: IUploadFileService;
  url?: string;
}
