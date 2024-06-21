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
} from "@chakra-ui/react";

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
      {/* <SignUp isOpen={isOpenSignUp} onClose={onCloseSignUp} /> */}
      <SignIn isOpen={isOpenLogIn} onClose={onCloseLogIn} />
    </Box>
  );
}
