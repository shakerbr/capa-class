import { useState } from "react";
import { saveToken, isLoggedIn } from "../services/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleLogin() {
    setError("");
    setSuccess("");

    if (email === "" || password === "") {
      setError("Email and password can't be empty");
    }

    try {
      const response = await fetch("http://localhost:3931/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(
          data.error || "Error: Couldn't login, please try again later.",
        );
        return;
      }

      const data = await response.json();
      console.log(data.token);
      setSuccess("Login Successful");
      saveToken(data.token);
      window.location.href = "/";
    } catch (e) {
      setError("Error: " + e);
    }
  }

  if (isLoggedIn()) {
    window.location.href = "/";
    return null;
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {success && <p className="text-green-400">{success}</p>}
      {error && <p className="text-red-400">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        className="block p-2 mt-3 border rounded-lg"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="block p-2 mt-3 border rounded-lg"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-blue-900 text-white px-6 py-2 mt-3 rounded-lg"
        onClick={handleLogin}
      >
        Login
      </button>

      <button
        className="text-white hover:underline px-6 py-2 mt-3 rounded-lg"
        onClick={() => (window.location.href = "/register")}
      >
        Register
      </button>
    </div>
  );
}

export default Login;
