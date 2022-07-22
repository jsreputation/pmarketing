import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NativeBridgeService {

  constructor() {}

  public sendToNative(payload: string): void {
    // This function will send the stringified json to native.
    // We can add an EventListener to an object on the page to call this function when it is clicked.
    try {
      // @ts-ignore
      if (typeof webkit !== 'undefined' && webkit !== null) {
        // @ts-ignore
        webkit.messageHandlers.callNativeAppWKCore.postMessage(payload);
      } else {
        console.log('not mobile webkit');
      }
    } catch (err) {
      console.error('Cannot reach Webkit interface');
    }
    try {
      // @ts-ignore
      if (typeof Android !== 'undefined' && Android !== null) {
        // @ts-ignore
        Android.callNativeApp(payload);
      } else {
        console.log('not mobile android');
      }
    } catch (err) {
      console.error('Cannot reach Android interface');
    }
  }
}
