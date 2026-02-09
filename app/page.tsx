
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "./loading";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  function handleClick() {
    setIsLoading(true);
    router.push("/users");
  }

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className=" flex items-center justify-center  h-screen bg-gray-100  opacity-50 text-black buttons">
      <Link href="/users">Home page</Link>
      <button onClick={handleClick}>Click</button>
    </div>
  );
}
