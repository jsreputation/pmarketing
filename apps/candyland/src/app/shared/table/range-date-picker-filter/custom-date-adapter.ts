import { NativeDateAdapter } from 'saturn-datepicker';
import { DatePipe } from '@angular/common';

export class CustomDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      return new DatePipe('en-US').transform(date, 'EEE, MMM dd, yyyy');
    } else {
      return date.toDateString();
    }
  }
}

// export class CustomDateAdapter extends NativeDateAdapter {
//   private datePipe = new DatePipe(this.locale);
//
//   format(date: Date, displayFormat: any): string {
//     if (typeof displayFormat === 'string') {
//       const result = this.datePipe.transform(date, displayFormat);
//       return result ? result : '';
//     } else {
//       return super.format(date, displayFormat);
//     }
//   }
// }

// const SUPPORTS_INTL_API = typeof Intl !== 'undefined';
//
// export class CustomDateAdapter extends NativeDateAdapter {
//   useUtcForDisplay = true;
//   parse(value: any): Date | null {
//     if ((typeof value === 'string') && (value.indexOf('/') > -1)) {
//       const str = value.split('/');
//       const year = Number(str[2]);
//       const month = Number(str[1]) - 1;
//       const date = Number(str[0]);
//       return new Date(year, month, date);
//     }
//     const timestamp = typeof value === 'number' ? value : Date.parse(value);
//     return isNaN(timestamp) ? null : new Date(timestamp);
//   }
// }
