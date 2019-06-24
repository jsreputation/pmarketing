import { Observable } from 'rxjs';

export interface IGameService {
    play(id: number): Observable<any>;
}
