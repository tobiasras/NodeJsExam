import { writable } from "svelte/store";
import { persistStore } from "./persistStore";

export const userStore = writable()
export const tokenData = writable()

persistStore(userStore, "user")
persistStore(tokenData, "token")
