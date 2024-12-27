// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js";
import { getDatabase, ref, set, update } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQAsjRWcX3tuQKYy61VtCKdq5hunsKjr8",
  authDomain: "book-management-e3511.firebaseapp.com",
  projectId: "book-management-e3511",
  storageBucket: "book-management-e3511.appspot.com",
  messagingSenderId: "1053972221159",
  appId: "1:1053972221159:web:6acdeb171dca0d0a18a642",
  measurementId: "G-753NEX5MBQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Register User
function register() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const full_name = document.getElementById("full_name").value.trim();

  // Validate input fields
  if (!validateEmail(email)) {
    alert("Invalid email format.");
    return;
  }
  if (!validatePassword(password)) {
    alert("Password must be at least 6 characters long.");
    return;
  }
  if (!validateField(full_name)) {
    alert("Full name cannot be empty.");
    return;
  }

  // Create user
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Store user data in the database
      const userRef = ref(database, `users/${user.uid}`);
      const userData = {
        email: email,
        full_name: full_name,
        last_login: Date.now(),
      };

      set(userRef, userData)
        .then(() => {
          alert("User created successfully!");
        })
        .catch((error) => {
          console.error("Database Error:", error);
          alert("Failed to store user data.");
        });
    })
    .catch((error) => {
      console.error("Auth Error:", error);
      alert(`Error: ${error.message}`);
    });
}

// Login User
function login() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
  
    // Validate input fields
    if (!validateEmail(email) || !validatePassword(password)) {
      alert("Invalid email or password.");
      return;
    }
  
    // Sign in user
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
  
        // Update last login time in the database
        const userRef = ref(database, `users/${user.uid}`);
        const userData = {
          last_login: Date.now(),
        };
  
        update(userRef, userData)
          .then(() => {
            alert("User logged in successfully!");
            console.log("Redirecting to homePage.html...");
            window.location.href = "homePage.html"; // Ensure this file exists and is correctly referenced
          })
          .catch((error) => {
            console.error("Database Error:", error);
            alert("Failed to update login time.");
          });
      })
      .catch((error) => {
        console.error("Auth Error:", error);
        alert(`Error: ${error.message}`);
      });
  }
  
// Utility functions
function validateEmail(email) {
  const regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  return regex.test(email);
}

function validatePassword(password) {
  return password.length >= 6;
}

function validateField(field) {
  return field != null && field.trim() !== "";
}

// Expose functions to global scope
window.register = register;
window.login = login;
