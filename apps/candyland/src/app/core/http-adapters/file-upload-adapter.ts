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

  public static transformToUploadedFile(data: any, filePath: string): IUploadedFile {
    return {
      created_at: data.attributes.created_at,
      updated_at: data.attributes.updated_at,
      url: filePath + '/' + data.id,
      name: data.attributes.blob.filename,
      key: data.attributes.blob.key,
      id: data.id,
      type: data.type
    };
  }
}
