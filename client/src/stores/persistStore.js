export const persistStore = (store, key) => {
  const savedValue = localStorage.getItem(key);

  if (savedValue !== "undefined") {
    store.set(JSON.parse(savedValue))
  }

  store.subscribe((value) => {
    localStorage.setItem(key, JSON.stringify(value));
  });
};
