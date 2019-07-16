import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EnvConfig } from './env-config';

@Injectable({
  providedIn: 'root'
})
export class RewardsService {

  private apiHost: string;

  constructor(private httpClient: HttpClient, config: EnvConfig) {
    this.apiHost = config.env.apiHost;
  }

  getTags() {

  }

  getRewards() {

  }

  getReward(id: number) {

  }

  redeemReward(id: number) {

  }
}
