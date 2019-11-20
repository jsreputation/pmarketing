import { QueryList } from '@angular/core';
import { InkListenerDirective } from '@cl-shared/components/ink/directives/ink-listener.directive';

export interface IInkBarHost {
  getInkListeners(): QueryList<InkListenerDirective>;
}
