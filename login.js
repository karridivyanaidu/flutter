// Hardcoded credentials (for demo only!)
const validUser = {
  username: "divya123",
  password: "mysecret"
};


document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  const errorMsg = document.getElementById('errorMsg');

  if (username === validUser.username && password === validUser.password) {
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "diary.html"; // Redirect to your diary
  } else {
    errorMsg.textContent = "Incorrect username or password.";
  }
});
