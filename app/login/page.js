import { AuthInput } from "./AuthInput";

export default function Login() {
  async function handleLogin(email, password) {
    "use server";
    console.log("email: ", email);
    let response = await fetch(`${process.env.APP_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    let data = await response.json();
    if (data.status == "SUCCESS") {
      return data.user;
    } else if (data.status == "FAILURE") {
      return null;
    }
  }

  return (
    <div>
      <AuthInput handleLogin={handleLogin} />
    </div>
  );
}
