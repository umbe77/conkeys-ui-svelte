import { writable } from "svelte/store";
import { getKeys } from "./api";

export const lookforKey = writable("");

const createKeysStore = () => {
  const { subscribe, update, set } = writable(new Promise(() => {}));

  set(getKeys());
  let lookfor;
  lookforKey.subscribe((v) => (lookfor = v));

  return {
    subscribe,
    refresh: () =>
      update(() => {
        return getKeys(lookfor);
      }),
  };
};

export const keys = createKeysStore();

export const selectedKey = writable({
  key: "",
  type: 0,
  value: 0,
});

export const showEditKey = writable(false);
export const showDeleteKey = writable(false);
