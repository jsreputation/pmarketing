import { TokenStorage } from '../storage/token-storage.service';

export const LocaleIdFactory = (tokenStorage: TokenStorage) => {
  // first try to get lang from Token Storage
  let l = tokenStorage.getAppInfoProperty('lang');
  if (l) {
    return l;
  }
  // Then, if not available get it from html tag
  l = document.documentElement.lang;
  if (l) {
    return l;
  }
  // finally default to english
  return 'en';
};
