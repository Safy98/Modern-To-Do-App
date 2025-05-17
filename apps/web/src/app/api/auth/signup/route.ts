import { BackEndUrl } from "@/lib/constants";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password, name } = await req.json();

  const res = await fetch(BackEndUrl + "/auth/signup", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      name,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to sign up");
  }
  const data = await res.json();

  return NextResponse.json(data);
}
