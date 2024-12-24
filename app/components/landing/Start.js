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
      <p className="text-7xl font-semibold">
        Welcome to <span className="bg-green-200 rounded-lg p-1">in-n-out</span>.
      </p>

      <div className="flex gap-3">
        <SignInDialog />
        <SignUpDialog />
      </div>


    </div>
    // <Box
    //   minHeight={"100vh"}
    //   display={"flex"}
    //   alignItems={"center"}
    //   justifyContent={"center"}
    //   flexDirection={"column"}
    //   textAlign={"center"}
    // >
    //   <Heading size={"4xl"} my={5}>
    //     <Highlight
    //       query="in-n-out"
    //       styles={{ px: "2", py: "1", rounded: "full", bg: "green.100" }}
    //     >
    //       Welcome to in-n-out.
    //     </Highlight>
    //   </Heading>
    //   <ButtonGroup>
    //     <Button onClick={onOpenSignUp}>Sign Up</Button>
    //     <Button onClick={onOpenLogIn}>Sign In</Button>
    //   </ButtonGroup>
    //   <SignUp isOpen={isOpenSignUp} onClose={onCloseSignUp} />
    //   <SignIn isOpen={isOpenLogIn} onClose={onCloseLogIn} />
    // </Box>
  );
}
