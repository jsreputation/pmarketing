export interface IShakeOptions {
  threshold?: number; // velocity threshold for shake to register
  timeout?: number; // interval between events
}

/**
 * From https://github.com/alexgibson/shake.js
 */
export class Shake implements EventListenerObject {
  public static EVENT: string = 'shake';

  private hasDeviceMotion: boolean;
  private options: IShakeOptions;

  // use date to prevent multiple shakes firing
  private lastTime: Date = new Date();
  // accelerometer values
  private lastX: number | null = null;
  private lastY: number | null = null;
  private lastZ: number | null = null;
  private event: Event;

  constructor(options?: IShakeOptions) {
    // feature detect
    this.hasDeviceMotion = 'ondevicemotion' in window;

    this.options = {
      ...options,
      threshold: 15, // default velocity threshold for shake to register
      timeout: 1000 // default interval between events
    };

    // create custom event
    // @ts-ignore
    if (typeof document.CustomEvent === 'function') {
      // @ts-ignore
      this.event = new document.CustomEvent(Shake.EVENT, {
        bubbles: true,
        cancelable: true
      });
    } else if (typeof document.createEvent === 'function') {
      this.event = document.createEvent('Event');
      this.event.initEvent(Shake.EVENT, true, true);
    }
  }

  // reset timer values
  private reset(): void {
    this.lastTime = new Date();
    this.lastX = null;
    this.lastY = null;
    this.lastZ = null;
  }

  // start listening for devicemotion
  public start(): void {
    this.reset();
    if (this.hasDeviceMotion) {
      window.addEventListener('devicemotion', this, false);
    }
  }

  // stop listening for devicemotion
  public stop(): void {
    if (this.hasDeviceMotion) {
      window.removeEventListener('devicemotion', this, false);
    }
    this.reset();
  }

  // calculates if shake did occur
  protected devicemotion(e: DeviceMotionEvent): void {
    const current: DeviceAcceleration = e.accelerationIncludingGravity;

    if ((this.lastX === null) || (this.lastY === null) || (this.lastZ === null)) {
      this.lastX = current.x;
      this.lastY = current.y;
      this.lastZ = current.z;
      return;
    }

    const deltaX: number = Math.abs(this.lastX - current.x);
    const deltaY: number = Math.abs(this.lastY - current.y);
    const deltaZ: number = Math.abs(this.lastZ - current.z);

    const delta: number = Math.sqrt([deltaX, deltaY, deltaZ].reduce((p, c) => p + c * c, 0));
    if (delta > this.options.threshold) {
      // calculate time in milliseconds since last shake registered
      const currentTime: Date = new Date();
      const timeDifference: number = currentTime.getTime() - this.lastTime.getTime();

      if (timeDifference > this.options.timeout) {
        window.dispatchEvent(this.event);
        this.lastTime = new Date();
      }
    }

    this.lastX = current.x;
    this.lastY = current.y;
    this.lastZ = current.z;
  }

  // event handler
  public handleEvent(e: Event): void {
    if (typeof (this[e.type]) === 'function') {
      return this[e.type](e);
    }
  }
}
