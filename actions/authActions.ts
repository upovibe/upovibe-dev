"use server";

import { signIn } from "next-auth/react";

export async function handleGitHubSignIn() {
  await signIn("github");
}
