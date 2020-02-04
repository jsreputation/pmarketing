import { Observable, of } from 'rxjs';
import { IEngagementType } from '@cl-core/models/engagement/engagement.interface';

export class MockEngagementsService {

  public getEngagementData(id?: string, type?: string): any {
    return {
      id: id ? id : '1',
      type: type ? type : 'test',
      urn: 'test',
      created_at: 'test',
      updated_at: 'test',
    };
  }

  public getEngagements(): Observable<IEngagementType[]> {
    return of([this.getEngagementData()]);
  }

  public getEngagement(id: string, type: string): Observable<IEngagementType> {
    return of(this.getEngagementData(id, type));
  }

  public getEngagementType(): Observable<IGraphic[]> {
    return of([ {
      id: 1,
      type: 'survey',
      title: 'SURVEY',
      img: 'assets/images/engagement-type/survey.svg',
      active: false
    }]);
  }

  public getGamesType(): Observable<IGraphic[]> {
    return of([  {
      id: 2,
      type: 'shake',
      title: 'SHAKE_THE_TREE',
      img: 'assets/images/games/shake.png',
      active: false
    }]);
  }
}
