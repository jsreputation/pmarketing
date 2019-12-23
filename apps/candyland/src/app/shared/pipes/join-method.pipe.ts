import { OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { LoyaltyJoinMethodMap } from '@cl-core/models/loyalty/loyalty-joing-method-map';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Pipe({
  name: 'JoinMethod'
})
export class JoinMethodPipePipe implements PipeTransform, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  private dictionary: any;
  constructor(public translate: TranslateService) {
    this.translate.get('LOYALTY_FEATURE')
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.dictionary = value;
      });
  }
  public transform(JoinMethods: any): string {
    const result: string[] = [];
    Object.keys(JoinMethods).forEach(
      (key) => {
        const titleTemplate = LoyaltyJoinMethodMap[key].titleTemplate;
        switch (typeof (titleTemplate)) {
          case 'string':
            result.push(this.getTranslate(titleTemplate).toLowerCase());
            break;
          case 'function':
            const resCallback = titleTemplate(JoinMethods[key], this.getTranslate(key).toLowerCase());
            result.push(resCallback);
            break;
        }
      }
    );
    return result.join('\n');
  }

  public getTranslate(str: string): string {
    if (this.dictionary) {
      return this.dictionary[str];
    }
    return str;
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
