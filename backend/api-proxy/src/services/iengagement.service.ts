import { IEngagement, IUpdateEngagement } from './engagement.model';
import { Observable } from 'rxjs';
import { IListResponse, ISingleResponse } from './response.model';
import { IPostRequest, IPatchRequest } from './request.model';

export interface IEngagementService {
    getEngagements(): Observable<IListResponse<IEngagement>>;
    getEngagement(id: number): Observable<ISingleResponse<IEngagement>>;
    deleteEngagement(id: number): Observable<void>;
    postEngagement(engagement: IPostRequest<IUpdateEngagement>): Observable<ISingleResponse<IEngagement>>;
    patchEngagement(id: number, engagement: IPatchRequest<IUpdateEngagement>): Observable<ISingleResponse<IEngagement>>;
}
