import { IEngagement, IUpdateEngagement } from './engagement.model';
import { Observable } from 'rxjs';
import { IListResponse, ISingleResponse } from './response.model';
import { IPostRequest, IPatchRequest } from './request.model';
import { IncomingHttpHeaders } from 'http';

export interface IEngagementService {
    getEngagements(headers?: IncomingHttpHeaders): Observable<IListResponse<IEngagement>>;
    getEngagement(id: number, headers?: IncomingHttpHeaders): Observable<ISingleResponse<IEngagement>>;
    deleteEngagement(id: number, headers?: IncomingHttpHeaders): Observable<void>;
    postEngagement(engagement: IPostRequest<IUpdateEngagement>, headers?: IncomingHttpHeaders): Observable<ISingleResponse<IEngagement>>;
    patchEngagement(
        id: number,
        engagement: IPatchRequest<IUpdateEngagement>,
        headers?: IncomingHttpHeaders
    ): Observable<ISingleResponse<IEngagement>>;
}
