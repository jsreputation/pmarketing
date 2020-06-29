import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../config/config.service';
import { TransactionsService } from './transactions.service';
import { IConfig } from '../../config/models/config.model';
import {
  EMPTY,
  Observable
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class V4TransactionsService extends TransactionsService {
  private apiHost: string;

  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) {
    super();
    this.configService.readAppConfig().subscribe(
      (config: IConfig<void>) => {
        this.apiHost = config.apiHost as string;
      });
  }

  public getTransactions(): Observable<any> {
    return EMPTY
  }
}
