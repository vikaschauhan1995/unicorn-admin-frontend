

export function getDataFromLocalStorage(key) {
  const data = localStorage.getItem(key);
  return data;
}