
import { Observable } from 'rxjs';
import { IBadge } from './models/badge.model';

export abstract class BadgeService {
    public abstract getAchievedBadgeCount(): Observable<number>;
    public abstract getBadgesByState(earned: boolean, page?: number, pageSize?: number): Observable<IBadge[]>;
    public abstract getAllBadges(page?: number, pageSize?: number): Observable<IBadge[]>;
}
