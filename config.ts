export const isDev = process.env.NODE_ENV === "development";

export const url = isDev
  ? "http://localhost:3000"
  : "https://www.thunderboltdev.site";

export const socials = {
  github: "https://github.com/ThunderboltDev",
  discord: "https://discord.com/users/855342398115414037",
  twitter: "https://x.com/Thunderbolt3141",
  email: "support@thunderboltdev.site",
} as const;
