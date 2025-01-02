"use client";
import { SignInDialog } from "@/app/components/landing/SignInDialog";
import { SignUpDialog } from "@/app/components/landing/SignUpDialog.js";
import { useAppSelector, useAppDispatch, useAppStore } from "@/redux/hooks.js";
import { clearError } from "@/redux/slices/userSlice.js";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";


export function Start() {
  //hooks
  const { toast } = useToast();
  const router = useRouter();
  const dispatch = useAppDispatch();

  //redux state
  const { error, isLoggedIn } = useAppSelector((state) => state.user);

  //detect an already signed in user
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard");
    }
  }, [isLoggedIn]);

  //show error message if auth failed
  useEffect(() => {
    if (error) {
      toast({
        title: "Authentication Failed",
        description: "Incorrect Email/Password",
      });
      dispatch(clearError());
    }
  }, [error, toast]); 

  return (
    <div className="flex flex-col justify-center items-center gap-8 h-screen">
      <p className="text-7xl font-semibold leading-snug text-center">
        Welcome to <span className="bg-green-200 rounded-lg whitespace-nowrap">in-n-out</span>.
      </p>

      <div className="flex gap-3">
        <SignInDialog />
        <SignUpDialog />
      </div>


    </div>
  );
}
