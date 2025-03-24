import React, { useState } from "react";
import styles from "./SellerLogin.module.css"; // Importing CSS module

interface LoginPopupProps {
  onClose: () => void;
}

const SellerLogin: React.FC<LoginPopupProps> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      setErrorMessage("⚠ Please fill in all fields.");
      setSuccessMessage(""); // Clear success message
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("⚠ Please enter a valid email address.");
      setSuccessMessage("");
    } else if (password.length < 6) {
      setErrorMessage("⚠ Password must be at least 6 characters long.");
      setSuccessMessage("");
    } else {
      setErrorMessage(""); // Clear errors
      setSuccessMessage("✅ Login successful! Redirecting...");
      setTimeout(() => onClose(), 2000); // Simulate redirect
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button className={styles.closeBtn} onClick={onClose}>✖</button>
        <h2 className={styles.title}>Login</h2>

        {/* Error Message */}
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

        {/* Success Message */}
        {successMessage && <p className={styles.successMessage}>{successMessage}</p>}

        <input
          type="email"
          placeholder="Email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className={styles.forgetPassword}>
          <a className={styles.link}>Forgot Password?</a>
        </div>

        <button 
          className={styles.loginBtn} 
          onClick={handleLogin} 
          disabled={!email || !password} // Disable button if empty fields
        >
          Login
        </button>

        <div className={styles.links}>
          <a className={styles.link}>Create New Account</a>
        </div>
      </div>
    </div>
  );
};

export default SellerLogin;
