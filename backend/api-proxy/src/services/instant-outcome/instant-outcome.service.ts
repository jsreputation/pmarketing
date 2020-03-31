import { Injectable, HttpService } from '@nestjs/common';
import { EngagementService } from '../engagement.service';
import { IEngagement } from '../engagement.model';
import { IEngagementService } from '../iengagement.service';

@Injectable()
export class InstantOutcomeService extends EngagementService<IEngagement> implements IEngagementService {
  // from outside it is called instant_outcome but from within the cluster it is called engagement...
  protected service: string = 'engagement';

  // important so, that parent abstract class get HttpService injected
  constructor(protected http: HttpService) {
    super(http);
  }
}
