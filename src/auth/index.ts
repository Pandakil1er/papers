import { issuer } from "@openauthjs/openauth";
import { CodeUI } from "@openauthjs/openauth/ui/code";
import { CodeProvider } from "@openauthjs/openauth/provider/code";
import { MemoryStorage } from "@openauthjs/openauth/storage/memory";
import { subjects } from "./subjects";
import { GoogleProvider } from "@openauthjs/openauth/provider/google";
import { THEME_TERMINAL } from "@openauthjs/openauth/ui/theme";

async function getUser(email: string) {
  // Get user from database and return user ID
  return "123";
}

export default issuer({
  theme: THEME_TERMINAL,
  subjects,
  storage: MemoryStorage(),
  providers: {
    google: GoogleProvider({
      clientID: "env.CLIENT_ID",
      clientSecret: "env.CLIENT_SECRET",
      scopes: ["email", "profile"],
    }),
    code: CodeProvider(
      CodeUI({
        sendCode: async (email, code) => {
          console.log(email, code);
        },
      })
    ),
  },
  success: async (ctx, value) => {
    if (value.provider === "code") {
      return ctx.subject("user", {
        id: await getUser(value.claims.email),
      });
    }
    if (value.provider === "google") {
      console.log(value);
      return ctx.subject("user", {
        // id: await getUser(value.claims.email),
        id: "1",
      });
    }
    throw new Error("Invalid provider");
  },
});
