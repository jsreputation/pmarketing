
import { Observable } from 'rxjs';
import { IBadge } from './models/badge.model';

export abstract class IBadgeService {
    public abstract getAchievedBadgeCount(): Observable<number>;
    public abstract getAllBadges(): Observable<IBadge[]>;
}
