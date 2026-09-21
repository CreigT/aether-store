import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { secrets } from "./config";

const COOKIE = "aether_access";

function key() {
  return new TextEncoder().encode(secrets.accessToken);
}

export type AccessPayload = {
  email?: string;
  entitlements: string[];
  sessionId?: string;
};

export async function signAccess(payload: AccessPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("180d")
    .sign(key());
}

export async function readAccess(): Promise<AccessPayload | null> {
  const token = cookies().get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, key());
    return {
      email: typeof payload.email === "string" ? payload.email : undefined,
      entitlements: Array.isArray(payload.entitlements)
        ? (payload.entitlements as string[])
        : [],
      sessionId:
        typeof payload.sessionId === "string" ? payload.sessionId : undefined
    };
  } catch {
    return null;
  }
}

export function accessCookie(token: string) {
  return {
    name: COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 180
  };
}

export function hasEntitlement(
  access: AccessPayload | null,
  needed: string | string[]
) {
  if (!access) return false;
  const list = Array.isArray(needed) ? needed : [needed];
  if (access.entitlements.includes("pack:founder")) return true;
  if (access.entitlements.includes("member:library")) {
    return list.some(
      (item) => item.startsWith("pack:") || item === "member:library"
    );
  }
  return list.some((item) => access.entitlements.includes(item));
}
