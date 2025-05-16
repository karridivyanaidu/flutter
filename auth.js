// Redirect if already logged in
if (window.location.pathname.includes('index.html') && localStorage.getItem('loggedIn') === 'true') {
  window.location.href = 'diary.html';
}

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const logoutBtn = document.getElementById('logoutBtn');

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('loginUsername').value;
      const remember = document.getElementById('rememberMe').checked;

      // Accept ANY login (no checking!)
      localStorage.setItem('loggedIn', 'true');
      if (remember) localStorage.setItem('rememberedUser', username);
      window.location.href = 'diary.html';
    });
  }

  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = document.getElementById('signupUsername').value;
      const password = document.getElementById('signupPassword').value;

      // Save entered data, but not used in login anymore
      localStorage.setItem('user', JSON.stringify({ username, password }));
      alert('Signup successful! Please login.');
      window.location.href = 'login.html';
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.setItem('loggedIn', 'false');
      window.location.href = 'index.html';
    });
  }
});
