import { Observable } from 'rxjs';
import { IPlatformEnrolment } from './platform-enrolment.model';


export abstract class PlatformEnrolmentService {
  public abstract validatePlatformEnrolment(): Observable<IPlatformEnrolment>;
}
