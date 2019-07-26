import { Injectable } from '@angular/core';
import { MerchantHttpService } from '@cl-core/http-services/merchant-http.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {

  constructor(private merchantHttpService: MerchantHttpService) { }

  public getMerchant(): Observable<IMerchant[]> {
    return this.merchantHttpService.getMerchants()
      .pipe(
        map((res: IMerchant[]) => res)
      );
  }
}
