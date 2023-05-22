import { writable } from "svelte/store";
import { persistStore } from "./persistStore";

export const user = writable()
export const tokenData = writable()

persistStore(user, "user")
persistStore(tokenData, "token")
