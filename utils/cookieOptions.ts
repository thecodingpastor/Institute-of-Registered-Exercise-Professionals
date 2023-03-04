import { SetOption } from "cookies";

export const CookieOptions: SetOption = {
  httpOnly: true,
  sameSite: "strict", // as I am hosting them on the same server
  // sameSite: process.env.NODE_ENV == "production" ? "none" : "lax",
  path: "/",
  // secure: true, // This works both in dev mode and prod in NODE BACKEND but DOENS'T WORK in next api.
  secure: process.env.NODE_ENV === "production",
  maxAge: +process.env.REFRESH_TOKEN_MAXAGE!,
};
