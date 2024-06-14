"use client";
import { useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch, useAppStore } from "@/redux/hooks";
import { useSession, signIn } from "next-auth/react";
import { setUser } from "@/redux/slices/userSlice";

export function Test() {
//   const dispatch = useAppDispatch();
//   const user = useAppSelector((state) => state.user.user);
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });
  console.log("Component re-rendered");
//   console.log("Current user:", user);
  console.log("Session:", session);
  console.log("Status:", status);

//   useEffect(() => {
//     if (session) {
//         console.log("updating user")
//       dispatch(setUser(session.user));
//     }
//     console.log("session or status changed");
//   }, [status]);
}
