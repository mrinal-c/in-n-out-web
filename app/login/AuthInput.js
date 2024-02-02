"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import secureLocalStorage from "react-secure-storage";
import { TextField, Button, Container, Paper, Typography } from "@mui/material";

export function AuthInput({ handleLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    let user = await handleLogin(email, password);
    if (user) {
      secureLocalStorage.setItem("email", email);
      secureLocalStorage.setItem("password", password);
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/home");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form style={{ width: "100%", marginTop: 20 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            style={{ marginTop: 20 }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
