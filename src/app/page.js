"use client";
import React from "react";
import { useRouter } from "next/navigation";

function HomePage() {
  const router = useRouter();

  React.useEffect(() => {
    router.replace("/Dashboard");
  }, []);

  return null;
}

export default HomePage;
