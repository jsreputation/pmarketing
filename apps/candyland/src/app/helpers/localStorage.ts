export class LocalStorage {
  static setToStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static getFromStorage(key: string) {
    return JSON.parse(localStorage.getItem(key));
  }

  static removeFromStorage(key: string) {
    localStorage.removeItem(key);
  }
}
