// // tslint:disable member-ordering
// // import createNumberMask from 'text-mask-addons/dist/createNumberMask';
//
// export class Masks {
//   public static PHONE_WITHOUT_EXT = {
//     mask: ['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
//     guide: false,
//     modelClean: true
//   };
//
//   public static DATE_MASK = {
//     mask: [/\d/, /\d/, '-', /[0-1]/, /[0-9]/, '-', /\d/, /\d/, /\d/, /\d/],
//     guide: false,
//     modelClean: true
//   };
//
//   public static persentsMaskFnc = createNumberMask({
//     allowDecimal: false,
//     prefix: '',
//     suffix: '%',
//     integerLimit: 3,
//     maxValue: 100,
//     minValue: 0
//   });
//
//   public static PERCENTS = {
//     mask: Masks.persentsMaskFnc,
//     guide: true,
//     modelClean: true
//   };
// }
