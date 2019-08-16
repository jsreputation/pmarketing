import { Injectable, HttpService } from '@nestjs/common';
import { EngagementService } from '../engagement.service';
import { IEngagement } from '../engagement.model';
import { IEngagementService } from '../iengagement.service';

@Injectable()
export class InstantOutcomeService extends EngagementService<IEngagement> implements IEngagementService {
    protected service: string = 'instant_reward';

    // important so, that parent abstract class get HttpService injected
    constructor(protected http: HttpService) {
        super(http);
    }
}
