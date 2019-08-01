import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'profilePhoto'
})
export class ProfilePhotoPipe implements PipeTransform {
  public transform(photo: string): any {
    return photo ? photo : 'assets/images/default-user.png';
  }
}
