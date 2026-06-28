import { isLoggedIn, removeToken } from "../services/auth";

function Logout() {
  if (isLoggedIn()) {
    removeToken();
    try {
      fetch("http://localhost:3931/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }
  window.location.href = "/";
}

export default Logout;
