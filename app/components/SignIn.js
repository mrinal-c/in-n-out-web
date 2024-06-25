"use client";
import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import { Formik } from "formik";
import { InputControl, SubmitButton } from "formik-chakra-ui";
import React from "react";
import * as Yup from "yup";
import { ModalForm } from "./ModalForm";
import { login } from "@/redux/slices/userSlice";
import { useAppSelector, useAppDispatch, useAppStore } from "@/redux/hooks";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().required().email(),
  password: Yup.string().required().min(2),
});

export function SignIn({ isOpen, onClose }) {
  const initialRef = React.useRef(null);
  const dispatch = useAppDispatch();


  const onLogIn = async (values) => {
    dispatch(login(values));
  };

  return (
    <ModalForm
      initialRef={initialRef}
      isOpen={isOpen}
      onClose={onClose}
      modalHeader="Log Into in-n-out"
    >
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => onLogIn(values)}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <Box as="form" onSubmit={handleSubmit}>
            <InputControl
              ref={initialRef}
              name="email"
              label="Email"
              isRequired
            />
            <InputControl
              name="password"
              label="Password"
              inputProps={{ type: "password" }}
              isRequired
            />

            <ButtonGroup float={"right"}>
              <SubmitButton>Log In</SubmitButton>
              <Button onClick={onClose}>Close</Button>
            </ButtonGroup>
          </Box>
        )}
      </Formik>
    </ModalForm>
  );
};