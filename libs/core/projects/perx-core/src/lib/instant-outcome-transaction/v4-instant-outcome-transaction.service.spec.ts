import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IInstantOutcomeTransactionService } from './instant-outcome-transaction.service';
import { V4InstantOutcomeTransactionService } from './v4-instant-outcome-transaction.service';
import { ConfigService } from '../../lib/config/config.service';

const instantOutcomeTransactionServiceStub: Partial<IInstantOutcomeTransactionService> = {
  getInstantOutcomeTransactions: () => of(),
  claimPrize: () => of(),
  getInstantRewardState: () => of(),
  getInstantOutcomeTransaction: () => of(),
  getInstantOutcomeTransactionOutcomes: () => of([]),
};
const configServiceStub: Partial<ConfigService> = {
  readAppConfig: () => of()
};

describe('V4InstantOutcomeTransactionService', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule ],
    providers: [
      { provide: IInstantOutcomeTransactionService, useValue: instantOutcomeTransactionServiceStub },
      { provide: ConfigService, useValue: configServiceStub }]
  }));

  it('should be created', () => {
    const service: V4InstantOutcomeTransactionService = TestBed.get(V4InstantOutcomeTransactionService);
    expect(service).toBeTruthy();
  });
});
