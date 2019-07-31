export class Mask {

  public static PHONE_WITHOUT_EXT: any = {
    mask: ['+', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/],
    guide: false,
    modelClean: true,
  };
}
