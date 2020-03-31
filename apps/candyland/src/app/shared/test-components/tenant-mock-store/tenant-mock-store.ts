import { of } from 'rxjs';
import { TenantStoreService } from '@cl-core-services';

export class TenantMockStore implements Partial<TenantStoreService> {
  public get tenant(): any {
    return of({});
  }
  public get tenant$(): any {
    return of({
      timeZone: 10,
      color: 'theme.color',
      currency: 'currency',
      style: 'theme.style',
      accent: 'theme.accent',
      buttonColor: 'theme.button_background_color',
      buttonTextColor: 'theme.button_text_color',
      font: 'theme.font',
      headerColor: 'theme.header_color',
      logo: 'theme.logo',
      primary: 'theme.primary',
      logoType: true
    });
  }
}
