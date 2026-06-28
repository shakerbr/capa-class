import React, { useEffect, useState } from "react";
import { isLoggedIn } from "../services/auth";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("http://localhost:3931/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch users");
      }
    }

    if (!isLoggedIn()) {
      setError("You must be logged in to view the dashboard.");
      return;
    }
    fetchUsers();
  }, []);

  if (error) {
    return <div className="text-red-500 text-center mt-8">{error}</div>;
  }

  if (!isLoggedIn()) {
    return (
      <div className="text-red-500 text-center mt-8">
        You must be logged in to view the dashboard.
        <a
          href="/login"
          className="text-blue-500 underline ml-2"
        >
          Log in
        </a>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-8">Dashboard</h1>
      <div>
        <table className="table-auto border-collapse border border-gray-700 m-auto mt-8">
          <thead className="bg-gray-700 text-white text-left">
            <tr>
              <th className="border border-gray-700 px-4 py-2">ID</th>
              <th className="border border-gray-700 px-4 py-2">Name</th>
              <th className="border border-gray-700 px-4 py-2">Email</th>
              <th className="border border-gray-700 px-4 py-2">Birth Date</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border border-gray-700 px-4 py-2">{user.id}</td>
                <td className="border border-gray-700 px-4 py-2">
                  {user.name}
                </td>
                <td className="border border-gray-700 px-4 py-2">
                  {user.email}
                </td>
                <td className="border border-gray-700 px-4 py-2">
                  {user.birth_date
                    ? new Date(user.birth_date).toLocaleDateString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
