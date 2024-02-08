"use client";

import { CircularProgress, Modal } from "@mui/material";
import secureLocalStorage from "react-secure-storage";
import { useEffect, useState } from "react";
import { login, wakeUpServer } from "./actions";

export default function Splash() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setup();
  }, []);

  const setup = async () => {
    console.log("setting up");
    setLoading(true);
    await wakeUpServer();
    setLoading(false);
    verifyLogin();
  };

  const verifyLogin = async () => {
    console.log("verifying login");
    let email = secureLocalStorage.getItem("email");
    let password = secureLocalStorage.getItem("password");

    console.log("email: ", email);
    console.log("password", password);

    secureLocalStorage.removeItem("email");
    secureLocalStorage.removeItem("password");

    login(email, password);
  };

  return (
    <div
      style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
    >
      <Modal
        open={loading}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">
            Please wait while the server gets ready
          </h2>
          <div>
            <CircularProgress />
          </div>
        </div>
      </Modal>
    </div>
  );
}
