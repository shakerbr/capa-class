function saveToken(token) {
    localStorage.setItem("token", token);
}

function getToken() {
    return localStorage.getItem("token");
}

function isLoggedIn() {
    const token = getToken();
    return !!token;
}

function removeToken() {
    localStorage.removeItem("token");
}

export { saveToken, getToken, isLoggedIn, removeToken };