
document.addEventListener("DOMContentLoaded", function() {
  // Form Login
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = {
        username_or_email: document.getElementById("username_or_email").value,
        Password: document.getElementById("password").value,
      };
      try {
        const response = await fetch("https://3r1djzn5-8080.asse.devtunnels.ms/user/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const result = await response.json();
        if (result.status === "OK") {
          alert("Login berhasil!");
          // Redirect ke halaman dashboard atau simpan token di localStorage
          localStorage.setItem("token", result.data.token);
          localStorage.setItem("user_id", result.data.user.UserId);
          window.location.href = "dashboard.html";
        } else {
          alert("Login gagal: " + result.error_message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    });
  }

  // Form Register
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = {
        username: document.getElementById("username").value,
        Password: document.getElementById("password").value,
        email: document.getElementById("email").value,
      };
      try {
        const response = await fetch("https://3r1djzn5-8080.asse.devtunnels.ms/user/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const result = await response.json();
        if (result.status === "OK") {
          alert("Registrasi berhasil");
          window.location.href = "dashboard.html";
        } else {
          alert("Registrasi gagal: " + result.error_message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    });
  }

  // Load header
  fetch('partials/header.html')
  .then(response => response.text())
  .then(data => {
      document.getElementById('header').innerHTML = data;
  })
  .catch(error => {
      console.error('Error loading header:', error);
  });
});

