import { of } from 'rxjs';
import { MatDialogConfig } from '@angular/material';

export class MatDialogStub {
    public params: any;
    // When the component calls this.dialog.open(...) we'll return an object
    // with an afterClosed method that allows to subscribe to the dialog result observable.
    public open(component: any, params: any): any {
        this.params = params;
        return {
            afterClosed: () => of([])
        };
    }
}
