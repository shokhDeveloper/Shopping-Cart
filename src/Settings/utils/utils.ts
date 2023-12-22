type BrowserStorage = object | string
export const getItem = (key: string) => window.localStorage.getItem(key);
export const setItem = (key: string, value: BrowserStorage) => window.localStorage.setItem(key, typeof value === "object" ? JSON.stringify(value): value)
export const removeItem = (key: string) => window.localStorage.removeItem(key)