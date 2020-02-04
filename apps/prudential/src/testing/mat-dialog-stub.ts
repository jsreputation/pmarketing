import { of } from 'rxjs';

export class MatDialogStub {
  public params: any;
  // When the component calls this.dialog.open(...) we'll return an object
  // with an afterClosed method that allows to subscribe to the dialog result observable.
  // @ts-ignore
  public open(component: any, params: any): any {
    this.params = params;
    return {
      afterClosed: () => of([])
    };
  }
}
