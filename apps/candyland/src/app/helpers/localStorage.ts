export class LocalStorage {
  public static setToStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public static getFromStorage(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  public static removeFromStorage(key: string) {
    localStorage.removeItem(key);
  }
}
