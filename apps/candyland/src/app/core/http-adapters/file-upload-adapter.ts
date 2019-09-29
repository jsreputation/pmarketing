export class FileUploadAdapter {
  public static transformToUploadedFile(data: any): IUploadedFile {
    return {
      cdn: data.attributes.cdn,
      created_at: data.attributes.created_at,
      updated_at: data.attributes.updated_at,
      url: data.attributes.url,
      id: data.id,
      type: data.type
    };
  }
}
