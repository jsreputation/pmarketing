import { Injectable, HttpService } from '@nestjs/common';
import { IEngagement } from '../engagement.model';
import { EngagementService } from '../engagement.service';
import { IEngagementService } from '../iengagement.service';

@Injectable()
export class LoyaltyService extends EngagementService<IEngagement> implements IEngagementService {
    protected service: string = 'loyalty';

    // important so, that parent abstract class get HttpService injected
    constructor(protected http: HttpService) {
      super(http);
    }
}
