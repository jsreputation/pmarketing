import { Injectable } from '@angular/core';
import { SettingsHttpService } from '@cl-core/http-services/settings-http.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private settingsHttpService: SettingsHttpService,
              private fb: FormBuilder) {
  }

  public getTimeZone(): Observable<ISimpleValue[]> {
    return this.settingsHttpService.getTimeZone()
      .pipe(
        map((res: ISimpleValue[]) => res)
      );
  }

  public getCurrency(): Observable<ISimpleValue[]> {
    return this.settingsHttpService.getCurrency()
      .pipe(
        map((res: ISimpleValue[]) => res)
      );
  }

  public getRoles(): Observable<any[]> {
    return this.settingsHttpService.getRoles();
  }

  public getRolesOptions(): Observable<any[]> {
    return this.settingsHttpService.getRolesOptions();
  }

  public getFormBranding(): FormGroup {
    return this.createFormBranding();
  }

  private createFormBranding(): FormGroup {
    return this.fb.group({
      style: [null], font: [null],
      primaryColor: ['#0f69af'],
      secondaryColor: ['#1cd6ff'],
      headerNavbarColor: [null],
      logo: [null, [Validators.required]],
      logoType: ['image'],
      button: [null]
    });
  }
}
