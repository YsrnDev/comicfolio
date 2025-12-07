import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: `http://${window.location.hostname}:4000`,
})
