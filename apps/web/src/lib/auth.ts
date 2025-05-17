export async function signUp(credentials: { name: string; email: string; password: string }) {
  const res = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(credentials),
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(res);

  if (!res.ok) {
    throw new Error("Failed to sign up");
  }

  return res.json();
}
