export const getLocalStorageValue = (key: string): string | null => {
  return localStorage.getItem(key);
};
