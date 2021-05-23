import { SignJWT } from "jose/jwt/sign";

export const sha512 = async (message) => {
  const hash = await crypto.subtle.digest(
    "SHA-512",
    new TextEncoder().encode(message)
  );
  const hashHex = Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
};

export const jwtSign = async (pwd) => {
  const secret = new TextEncoder().encode(await sha512(pwd));

  return await new SignJWT({})
    .setProtectedHeader({ alg: "HS512" })
    .sign(secret);
};
