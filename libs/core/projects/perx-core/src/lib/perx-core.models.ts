export enum RedemptionType {
  pin = 'pin',
  txtCode = 'txtCode',
  qr = 'qrcode',
  barcode = 'barcode',
  url = 'url',
  none = 'none',
  offline = 'offline'
}

export interface IMessageResponse {
  message: string;
}
