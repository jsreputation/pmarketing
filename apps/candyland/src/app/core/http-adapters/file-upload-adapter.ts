import { IWDocumentAttributes, IJsonApiItem, WFileUploadStatus } from '@perx/whistler';
export class FileUploadAdapter {
  public static transformToUploadedImage(data: any): IUploadedFile {
    return {
      cdn: data.attributes.cdn,
      createdAt: data.attributes.created_at,
      updatedAt: data.attributes.updated_at,
      url: data.attributes.url,
      id: data.id,
      type: data.type
    };
  }

  public static transformFileUploadStatus(data: WFileUploadStatus): FileUploadStatus {
    return FileUploadStatus[data];
  }

  public static transformToUploadedFile(data: IJsonApiItem<IWDocumentAttributes>): IUploadedFile {
    const attr = data.attributes;
    return {
      createdAt: attr.created_at,
      updatedAt: attr.updated_at,
      url: attr.url,
      name: attr.blob.filename,
      status: attr.status ? FileUploadAdapter.transformFileUploadStatus(attr.status) : null,
      processedAmount: attr.processed_amount,
      successAmount: attr.success_amount,
      failAmount: attr.fail_amount,
      processedDetails: attr.processed_details,
      key: attr.blob.key,
      id: data.id,
      type: data.type
    };
  }
}
