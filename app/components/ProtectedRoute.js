"use client"

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { loadUser } from "@/redux/slices/userSlice";

export const ProtectedRoute = ({ children }) => {

    //hooks
    const router = useRouter();
    const dispatch = useAppDispatch();
    const {isLoggedIn, isLoaded} = useAppSelector(state => state.user);

    useEffect(() => {
        if (!isLoaded) {
            dispatch(loadUser());
        } else if (!isLoggedIn && router.isReady) {
            router.push("/login");
        }
    }, [isLoggedIn, isLoaded, router]);

    return children;

}