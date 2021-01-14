import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { ErrorMessageService } from './error-message.service';

describe('ErrorMessageService', () => {
    beforeEach(() => TestBed.configureTestingModule({
        providers: [
            {
                provide: TranslateService, useValue: {
                    get: () => of('')
                }
            }
        ]
    }));

    it('should be created', () => {
        const service: ErrorMessageService = TestBed.get(ErrorMessageService);
        expect(service).toBeTruthy();
    });
});
