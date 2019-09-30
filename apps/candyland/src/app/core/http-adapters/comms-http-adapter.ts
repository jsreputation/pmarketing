export class CommsHttpAdapter {
  public static transformAPIResponseToComm(data: ICommApi): IComm {
    return {
      message: data.attributes.content
    };
  }
}
