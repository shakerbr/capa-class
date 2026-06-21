function Login() {
  return (
    <div className="flex flex-col items-center">
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        className="block p-2 mt-3 border"
      />
      <input
        type="password"
        placeholder="Password"
        className="block p-2 mt-3 border"
      />
      <button className="bg-blue-900 text-white p-2 mt-3">Login</button>
    </div>
  );
}

export default Login;
