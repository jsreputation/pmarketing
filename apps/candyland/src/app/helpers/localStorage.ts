export class LocalStorage {
  public static setToStorage(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public static getFromStorage(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }

  public static removeFromStorage(key: string): void {
    localStorage.removeItem(key);
  }
}
