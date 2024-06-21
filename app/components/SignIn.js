"use client";
import { Box, Button, ButtonGroup } from "@chakra-ui/react";
import { Formik } from "formik";
import { InputControl, SubmitButton } from "formik-chakra-ui";
import React from "react";
import * as Yup from "yup";
import { ModalForm } from "./ModalForm";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().required().email(),
  password: Yup.string().required().min(8),
});

export function SignIn({ isOpen, onClose }) {
  const initialRef = React.useRef(null);

  const onLogIn = async (values) => {
    console.log(values);
  };

  return (
    <ModalForm
      initialRef={initialRef}
      isOpen={isOpen}
      onClose={onClose}
      modalHeader="Log Into EcoTransit"
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