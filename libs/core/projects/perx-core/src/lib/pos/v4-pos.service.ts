import { Injectable } from '@angular/core';
import { PosService } from './pos.service';
import {
  HttpBackend,
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { ConfigService } from '../config/config.service';
import { AuthenticationService } from '../auth/authentication/authentication.service';
import { ProfileService } from '../profile/profile.service';
import { IProfile } from '../profile/profile.model';
import { IPosLoyaltyTransaction } from './models/pos.model';
import {
  map,
  switchMap,
  tap
} from 'rxjs/operators';
import {
  Observable
} from 'rxjs';
import { IConfig } from '../config/models/config.model';

interface IV4PosLoyaltyTransactionResponse {
  data: IV4PosLoyaltyTransaction;
}

interface IV4PosLoyaltyTransaction {
  id: number;
  loyalty_program_id: number;
  points: number;
  properties: {
    item_name: string;
    merchant_name: string;
    outlet_name: string;
  };
  transacted_at: Date;
}

@Injectable({
  providedIn: 'root'
})
export class V4PosService extends PosService {
  private identifier: string | undefined;
  private appToken: string;
  private apiHost: string;
  private http: HttpClient;

  constructor(
    handler: HttpBackend,
    private configService: ConfigService,
    private authenticationService: AuthenticationService,
    private profileService: ProfileService
  ) {
    super();
    this.configService.readAppConfig().subscribe(
      (config: IConfig<void>) => {
        this.apiHost = config.apiHost as string;
      });
    this.http = new HttpClient(handler);
  }

  public static v4PosTransactionToPosTransaction(pos: IV4PosLoyaltyTransaction): IPosLoyaltyTransaction {
    return {
      id: pos.id,
      loyaltyProgramId: pos.loyalty_program_id,
      points: pos.points,
      properties: {
        itemName: pos.properties.item_name,
        merchantName: pos.properties.merchant_name,
        outletName: pos.properties.outlet_name
      },
      transactedAt: pos.transacted_at
    };
  }

  public createTransaction(
    itemName: string,
    merchantName: string,
    outletName: string,
    transactionAmt: number,
    loyaltyProgramId: number
  ): Observable<IPosLoyaltyTransaction> {
    return this.profileService.whoAmI().pipe(
      tap((profile: IProfile) => this.identifier = profile.identifier ? profile.identifier : undefined),
      switchMap(() => this.authenticationService.getAppAccessToken()),
      tap((token: string) => this.appToken = token),
      switchMap(() => {
        const headers = new HttpHeaders()
          .set('Authorization', `Bearer ${this.appToken}`)
          .set('Content-Type', 'application/json');
        return this.http.post<IV4PosLoyaltyTransactionResponse>(
          `${this.apiHost}/v4/pos/loyalty_transactions`,
          {
            user_account: {
              identifier: `${this.identifier}`
            },
            properties: {
              item_name: `${itemName}`,
              merchant_name: `${merchantName}`,
              outlet_name: `${outletName}`
            },
            points: transactionAmt,
            loyalty_program_id: loyaltyProgramId
          },
          {
            headers
          }
        );
      }),
      map((response: IV4PosLoyaltyTransactionResponse) => response.data),
      map((posTransactions: IV4PosLoyaltyTransaction) => V4PosService.v4PosTransactionToPosTransaction(posTransactions))
    );
  }
}
