import { TestBed } from '@angular/core/testing';

import { LimitsService } from './limits.service';
import { LimitsHttpsService } from '@perxtech/whistler-services';
import { of } from 'rxjs';

describe('LimitsService', () => {
  let service: LimitsService;
  let limitsHttpServiceSpy: Partial<LimitsHttpsService>;
  let deleteLimitMock: jest.Mock;
  let updateLimitMock: jest.Mock;
  let createLimitMock: jest.Mock;

  beforeEach(() => {
    deleteLimitMock = jest.fn();
    updateLimitMock = jest.fn();
    createLimitMock = jest.fn();

    limitsHttpServiceSpy = {
      deleteLimit: deleteLimitMock,
      updateLimit: updateLimitMock,
      createLimit: createLimitMock
    };

    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        { provide: LimitsHttpsService, useValue: limitsHttpServiceSpy }
      ]
    })
      .compileComponents();
    service = TestBed.get(LimitsService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should delete the limit when updating it with empty times', (done: any) => {
    deleteLimitMock.mockReturnValue(of(void 0));
    service.updateLimit('id42', { duration: '' }, 'survey', 2, 3)
      .subscribe(() => { done(); });

    expect(deleteLimitMock).toHaveBeenCalledTimes(1);
    expect(deleteLimitMock).toHaveBeenLastCalledWith('survey', 'id42');
  });

  it('should not do anything when creating a limit with empty times', (done: any) => {
    service.createLimit({ duration: '' }, 'survey', 2, 4)
      .subscribe((s) => {
        expect(s).toBeUndefined();
        done();
      });
  });

  it('should update the limit when updating it with non empty times', (done: any) => {
    updateLimitMock.mockReturnValue(of(void 0));
    service.updateLimit('id42', { times: 3, duration: '' }, 'survey', 2, 4)
      .subscribe(() => { done(); });

    expect(updateLimitMock).toHaveBeenCalledTimes(1);
    expect(updateLimitMock).toHaveBeenCalledWith(
      'id42',
      {
        data: {
          id: 'id42',
          type: 'limits',
          attributes: { engagement_id: 4, campaign_entity_id: 2, max_responses_per_user: 3 }
        }
      },
      'survey'
    );
  });

  it('should create the limit when creating a limit with non empty times', (done: any) => {
    createLimitMock.mockReturnValue(of(void 0));
    service.createLimit({ duration: '', times: 3 }, 'survey', 2, 4)
      .subscribe((s) => {
        expect(s).toBeUndefined();
        done();
      });

    expect(createLimitMock).toHaveBeenCalledTimes(1);
    expect(createLimitMock).toHaveBeenCalledWith(
      { data: { type: 'limits', attributes: { engagement_id: 4, campaign_entity_id: 2, max_responses_per_user: 3 } } },
      'survey'
    );
  });
});
