import { of } from 'rxjs';
import { MatDialogConfig } from '@angular/material';

export class MatDialogStub {
    params: any;
    // When the component calls this.dialog.open(...) we'll return an object
    // with an afterClosed method that allows to subscribe to the dialog result observable.
    open(component: any, params: any) {
        this.params = params;
        return {
            afterClosed: () => of([])
        };
    }
}
