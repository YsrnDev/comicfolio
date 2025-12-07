import { betterAuth } from "better-auth";
import { db } from "./db";

export const auth = betterAuth({
    database: db,
    emailAndPassword: {
        enabled: true
    },
    trustedOrigins: [
        "http://localhost:4173",
        "http://localhost:3000",
        "http://192.168.100.50:4173",
        "http://192.168.100.50:3000",
        'https://portfolio.ysrn.xyz'
    ],
    user: {
        modelName: "user",
        fields: {
            // You can add custom fields here if needed in the future
        }
    }
});
