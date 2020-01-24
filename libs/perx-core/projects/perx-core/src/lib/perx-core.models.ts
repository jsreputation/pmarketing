export enum RedemptionType {
  pin = 'pin',
  txtCode = 'txtCode',
  qr = 'qrcode',
  barcode = 'barcode',
  none = 'none',
  offline = 'offline'
}

export interface IMessageResponse {
  message: string;
}
