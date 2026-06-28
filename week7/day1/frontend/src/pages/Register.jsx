import { useState } from "react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [error, setError] = useState("");

  async function handleRegister(e) {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Name, email, and password are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3931/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, birthDate }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(
          data.error || "Error: Couldn't register, please try again later.",
        );
        return;
      }

      const data = await response.json();
      console.log(data);
      setError("User registered successfully. Please login.");
      window.location.href = "/login";
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
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      {error && <p className="text-red-400">{error}</p>}
      <form
        className="flex flex-col items-center gap-2"
        onSubmit={handleRegister}
      >
        <input
          type="text"
          placeholder="Name"
          className="block p-2 mt-3 border rounded-lg w-54"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="block p-2 mt-3 border rounded-lg w-54"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="block p-2 mt-3 border rounded-lg w-54"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="date"
          placeholder="Birth Date"
          className="block p-2 mt-3 border rounded-lg w-54"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-900 text-white px-6 py-2 mt-3 rounded-lg"
        >
          Register
        </button>
      </form>

      <button
        className="text-white hover:underline px-6 py-2 mt-3 rounded-lg"
        onClick={() => (window.location.href = "/login")}
      >
        Back to Login
      </button>
    </div>
  );
}

export default Register;
