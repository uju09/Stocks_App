import Image from "next/image";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session?.user) {
    redirect("/dashboard");
    return null;
  } else {
    redirect("/signin");
    return null;
  }
  return (
    <></>
  );
}
