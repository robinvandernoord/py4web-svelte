// stores can be used as more complex variables.
// you can also build custom stores to work with e.g. localstorage, session storage or a backend.
// if you build a store with a backend, you need to build (at least) a read and write endpoint.

import {writable} from "svelte/store";

// some useful examples:

// abstract store that uses some form of storage
const StorageStore = (key, obj, storage) => {
    const {subscribe, set, update} = writable(obj);
    return {
        subscribe, set, update,
        useStore: () => {
            const json = storage.getItem(key);
            if(json && json !== 'undefined') {
                set(JSON.parse(json));
            }

            subscribe(current => {
                storage.setItem(key, JSON.stringify(current));
            });
        }
    };
};

// implementation of StorageStore with localstorage
export const localStorageStore = (key, obj) => {
    const {useStore, ...methods} = StorageStore(key, obj, localStorage);
    return {useLocalStorage: useStore, useStore, ...methods};
};

// implementation of StorageStore with session
export const sessionStorageStore = (key, obj) => {
    const {useStore, ...methods} = StorageStore(key, obj, sessionStorage);
    return {useSessionStorage: useStore, useStore, ...methods};
};