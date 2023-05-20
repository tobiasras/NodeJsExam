import { writable } from "svelte/store";
import { persistStore } from "./persistStore";

export const user = writable()
export const token = writable()

persistStore(user, "user")
persistStore(token, "token")



