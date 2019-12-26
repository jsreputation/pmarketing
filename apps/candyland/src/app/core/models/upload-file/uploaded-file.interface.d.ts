import { FileUploadStatus } from "@cl-core/services/iadvanced-upload-file.service";

declare interface IUploadedFile {
  id: string;
  type: string;
  url: string;
  cdn?: string;
  name?: string;
  key?: string;
  status?: FileUploadStatus | null;
  processedAmount?: number | null;
  successAmount?: number | null;
  failAmount?: number | null;
  processedDetails?: string | null;
  createdAt: string;
  updatedAt: string;
}
