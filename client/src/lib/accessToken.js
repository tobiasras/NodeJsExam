import {tokenData} from "../stores/userStore.js";
import {BASE_URL} from "../stores/globalStore.js";
import {get} from "svelte/store";

export async function accessToken() {
    let baseUrl = get(BASE_URL)
    let token = get(tokenData)

    if (new Date(token.expireDate) > new Date()) {
        return token.accessToken
    } else {
        const result = await fetch(`${baseUrl}/api/token`, {
            method: "POST",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify({
                    token: token.refreshToken
                })
        })

        if (result.status === 200) {
            const body = await result.json()
            tokenData.set({
                expireDate: new Date(body.expires),
                accessToken: body.accessToken,
                refreshToken: token.refreshToken
            })

            return accessToken
        } else {
            throw new Error("Failed to refresh token")
        }
    }
}
