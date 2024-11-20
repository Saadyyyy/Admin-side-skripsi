
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


document.addEventListener("DOMContentLoaded", async function () {
    // Get the JWT token from localStorage
    const token = localStorage.getItem("token");
  
    if (!token) {
      alert("You need to log in first.");
      window.location.href = "login.html"; // Redirect to login page if token is not available
      return;
    }
  
    // Get the user profile based on user_id (retrieved from localStorage)
    const userId = localStorage.getItem("user_id");
  
    if (!userId) {
      alert("User ID is not available. Please log in.");
      window.location.href = "login.html"; // Redirect to login page if user_id is not available
      return;
    }
  
    try {
      const response = await fetch(`https://3r1djzn5-8080.asse.devtunnels.ms/user/detail?user_id=${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Include JWT token in Authorization header
        }
      });
  
      const result = await response.json();
  
      if (result.status === "OK" && result.data) {
        const { username, profile } = result.data;
  
        // Create elements for the username and profile picture
        const profileContainer = document.getElementById("user-profile");
        profileContainer.innerHTML = `
        <span class="me-3 text-white" style="font-size: 1.4rem;font-weight: medium;">${username}</span>
        <img src="${profile}" alt="${username}'s profile" class="rounded-circle" width="50" height="50">
      `;
      
      } else {
        console.error("Failed to load user profile:", result.error_message || "Unknown error");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  });
  