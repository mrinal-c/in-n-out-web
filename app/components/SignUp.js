"use client";
import { Box, Button, ButtonGroup, SimpleGrid } from "@chakra-ui/react";
import { Formik } from "formik";
import { InputControl, SubmitButton } from "formik-chakra-ui";
import React from "react";
import * as Yup from "yup";
import { ModalForm } from "./ModalForm";
import { signup, clearError } from "@/redux/slices/userSlice";
import { useAppSelector, useAppDispatch, useAppStore } from "@/redux/hooks";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().required().email(),
  password: Yup.string().required().min(2),
});


export const SignUp = ({ isOpen, onClose }) => {
  const initialRef = React.useRef(null);
  const dispatch = useAppDispatch();


  const onSignUp = async (values) => {
    dispatch(signup(values));
  };

  return (
    <ModalForm
      initialRef={initialRef}
      isOpen={isOpen}
      onClose={onClose}
      modalHeader="Create Your Account"
    >
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => onSignUp(values)}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <Box as="form" onSubmit={handleSubmit}>
            <SimpleGrid columns={2} spacing={3}>
              {/* <InputControl
                ref={initialRef}
                name="firstName"
                label="First Name"
                isRequired
              />
              <InputControl name="lastName" label="Last Name" isRequired /> */}
            </SimpleGrid>
            <InputControl name="email" label="Email" isRequired />
            <InputControl
              name="password"
              label="Password"
              inputProps={{ type: "password" }}
              isRequired
            />

            <ButtonGroup float={"right"}>
              <SubmitButton>Create Account</SubmitButton>
              <Button onClick={onClose}>Close</Button>
            </ButtonGroup>
          </Box>
        )}
      </Formik>
    </ModalForm>
  );
};