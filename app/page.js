"use client";

import { OutView } from "./home/OutView";
import { addQueryParams } from "./utils";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  console.log(status);
  return <div>Tester</div>;
}
