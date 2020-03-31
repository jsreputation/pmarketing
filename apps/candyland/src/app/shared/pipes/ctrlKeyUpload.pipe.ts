import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'ctrlKeyVUpload'})
export class ControlKeyVUploadPipe implements PipeTransform {
  public transform(ctrlKeyV: [string, boolean]): string {
    const controlName = ctrlKeyV[0].match(/([A-Z])(\w)*/)[0];
    return `${controlName} ${ctrlKeyV[1] ? '' : '(optional)'}`;
  }
}
