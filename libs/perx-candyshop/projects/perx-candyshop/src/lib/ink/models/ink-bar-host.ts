import { QueryList } from '@angular/core';
import { InkListenerDirective } from '../directives/ink-listener.directive';

export interface IInkBarHost {
  getInkListeners(): QueryList<InkListenerDirective>;

}
