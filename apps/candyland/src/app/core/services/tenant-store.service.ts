import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TenantStoreService {
  private tenantSubject$: BehaviorSubject<ITenantsProperties> = new BehaviorSubject<ITenantsProperties>(null);

  public set tenant(tenant: ITenantsProperties) {
    this.tenantSubject$.next(tenant);
  }

  public get tenant(): ITenantsProperties {
    return this.tenantSubject$.value;
  }

  public get tenant$(): Observable<ITenantsProperties> {
    return this.tenantSubject$.asObservable();
  }

  public get currency$(): any {
    return this.tenantSubject$.pipe(
      map(tenant => tenant ? tenant.currency : null)
    );
  }

}
