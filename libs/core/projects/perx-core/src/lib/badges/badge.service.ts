
import { Observable } from 'rxjs';

export abstract class IBadgeService {
    public abstract getAchievedBadgeCount(): Observable<number>;
}
