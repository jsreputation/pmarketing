import { TestBed } from '@angular/core/testing';
import { IQuestService } from '../../lib/quest/quest.service';
import { V4QuestService } from './v4-quest.service';
import { of } from 'rxjs';
import {
  HttpClientTestingModule
} from '@angular/common/http/testing';
import { ConfigService } from '../../lib/config/config.service';

const questServiceStub: Partial<IQuestService> = {
  getQuestCampaigns: () => of(),
  getQuestsFromCampaign: () => of()
};
const configServiceStub: Partial<ConfigService> = {
  readAppConfig: () => of()
};

describe('V4QuestService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule ],
    providers: [
      { provide: IQuestService, useValue: questServiceStub },
      { provide: ConfigService, useValue: configServiceStub }]
  }));

  it('should be created', () => {
    const service: V4QuestService = TestBed.get(V4QuestService);
    expect(service).toBeTruthy();
  });
});
