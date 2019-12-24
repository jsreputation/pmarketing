import { IWDocumentAttributes, IJsonApiItem, WFileUploadStatus } from '@perx/whistler';
export class FileUploadAdapter {
  public static transformToUploadedImage(data: any): IUploadedFile {
    return {
      cdn: data.attributes.cdn,
      created_at: data.attributes.created_at,
      updated_at: data.attributes.updated_at,
      url: data.attributes.url,
      id: data.id,
      type: data.type
    };
  }

  public static transformFileUploadStatus(data: IJsonAPIItem<WFileUploadStatus>): FileUploadStatus {
    return FileUploadStatus[data]
  }

  public static transformToUploadedFile(data: IJsonApiItem<IWDocumentAttributes>): IUploadedFile {
    const attr = data.attributes;
    return {
      created_at: attr.created_at,
      updated_at: attr.updated_at,
      url: attr.url,
      name: attr.blob.filename,
      status: FileUploadAdapter.transformFileUploadStatus(attr.status),
      processed_amount: attr.processed_amount,
      success_amount: attr.success_amount,
      fail_amount: attr.fail_amount,
      processed_details: attr.processed_details,
      key: attr.blob.key,
      id: data.id,
      type: data.type
    };
  }
}
