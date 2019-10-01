export class LimitsHttpAdapter {
  public static transformAPIResponseToLimit(data: ILimitApi): ILimit {
    return {
      ...data.attributes
    };
  }
}
