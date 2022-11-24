import { createEffect, createStore } from 'effector';

const TIME_TO_STORE = 2 * 60 * 60;

const LOCAL_STORAGE_PREFIX = 'dicenrolla';

const LAST_UPDATED_KEY = `${LOCAL_STORAGE_PREFIX}:lastUpdated`;

export const loadLocalStorageFx = createEffect(async () => {
  try {
    const lastUpdated = Number(globalThis.localStorage.getItem(LAST_UPDATED_KEY));
    const appStorage = Object.fromEntries(
      Object.entries(globalThis.localStorage)
        .filter(([k]) => k.startsWith(`${LOCAL_STORAGE_PREFIX}:`))
        .map(([k, v]) => [k.split(':')[1], JSON.parse(v as string) || {}]),
    );

    const now = Math.floor(Date.now() / 1000);

    if (lastUpdated && now - lastUpdated < TIME_TO_STORE) {
      return appStorage;
    }
  } catch (e) {
    console.warn("Can't get data from local storage:", e);
  }
  return {};
});

export const $localStorageLoaded = createStore<boolean>(false).on(
  loadLocalStorageFx.done,
  () => true,
);

export const saveLocalStorageFx = createEffect(
  <State>({
    value,
    localStorageKey,
  }: {
    value: State;
    localStorageKey: string;
  }) => {
    try {
      globalThis.localStorage.setItem(
        `${LOCAL_STORAGE_PREFIX}:${localStorageKey}`,
        JSON.stringify(value),
      );
      globalThis.localStorage.setItem(
        LAST_UPDATED_KEY,
        String(Math.floor(Date.now() / 1000)),
      );
    } catch (e) {
      console.warn("Can't write data to local storage:", e);
    }
  },
);
