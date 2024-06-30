"use client";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";
import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  Highlight,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import { useAppSelector, useAppDispatch, useAppStore } from "@/redux/hooks";
import { clearError } from "@/redux/slices/userSlice";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function Start() {
  const {
    isOpen: isOpenSignUp,
    onOpen: onOpenSignUp,
    onClose: onCloseSignUp,
  } = useDisclosure();
  const {
    isOpen: isOpenLogIn,
    onOpen: onOpenLogIn,
    onClose: onCloseLogIn,
  } = useDisclosure();
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.user.error);
  const toast = useToast();
  

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/home");
    }
  }, [isLoggedIn]);

  

  useEffect(() => {
  
    if (error) {
      toast({
        title: "Authentication Error",
        description: error,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      dispatch(clearError());
    }
  }, [error, toast]); // Add toast to dependency array

  
  return (
    <Box
      minHeight={"100vh"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      flexDirection={"column"}
      textAlign={"center"}
    >
      <Heading size={"4xl"} my={5}>
        <Highlight
          query="in-n-out"
          styles={{ px: "2", py: "1", rounded: "full", bg: "green.100" }}
        >
          Welcome to in-n-out.
        </Highlight>
      </Heading>
      <ButtonGroup>
        <Button onClick={onOpenSignUp}>Sign Up</Button>
        <Button onClick={onOpenLogIn}>Sign In</Button>
      </ButtonGroup>
      <SignUp isOpen={isOpenSignUp} onClose={onCloseSignUp} />
      <SignIn isOpen={isOpenLogIn} onClose={onCloseLogIn} />
    </Box>
  );
}
