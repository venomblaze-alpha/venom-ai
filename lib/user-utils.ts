"use server";

import { cookies } from "next/headers";

export async function getUserIp(): Promise<string> {
  const cookieStore = await cookies();
  const ip = cookieStore.get("user-ip")?.value;
  return ip || "default";
}
