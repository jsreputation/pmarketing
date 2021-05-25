import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IPrizeSetOutcomeService } from './prize-set-outcome.service';
import { V4PrizeSetOutcomeService } from './v4-prize-set-outcome.service';
import { ConfigService } from '../../lib/config/config.service';

const prizeSetOutcomeServiceStub: Partial<IPrizeSetOutcomeService> = {
  getPrizeSetIssuedOutcomes: () => of(),
  getPrizeSetState: () => of(),
};
const configServiceStub: Partial<ConfigService> = {
  readAppConfig: () => of()
};

describe('V4PrizeSetOutcomeService', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule ],
    providers: [
      { provide: IPrizeSetOutcomeService, useValue: prizeSetOutcomeServiceStub },
      { provide: ConfigService, useValue: configServiceStub }]
  }));

  it('should be created', () => {
    const service: V4PrizeSetOutcomeService = TestBed.get(V4PrizeSetOutcomeService);
    expect(service).toBeTruthy();
  });
});
