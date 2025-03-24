import React, { useState } from 'react'
import styles from './UserLogin.module.css'
import { Link } from 'react-router'

interface FormData {
    email: string;
    password: string;
  }

const UserLogin:React.FC = () => {


     const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
      });

      const handlelogin = () =>{
        
      }

  return (
    <div className={styles.container}>
    <div className={styles.registerContainer}>
      <div className={styles.leftPanel}>
        <div className={styles.welcomeContent}>
          <h1 className={styles.welcomeTitle}>Looks like you're new here!</h1>
          <p className={styles.welcomeText}>
            Sign up with your details to get started
          </p>
        </div>
        <div className={styles.illustration}>
          {/* Illustration of devices */}
        </div>
      </div>
      <div className={styles.rightPanel}>
        <form className={styles.form} onSubmit={handlelogin}>

          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.inputLabel}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
            //   onChange={handleInputChange}
              className={`${styles.inputField}  `} //${!isValid.email || emailExist ? styles.inputError : ''}
              placeholder="Enter your email"
            />
            {/* {!isValid.email && formData.email && (
              <span className={styles.errorMessage}>
                Please enter a valid email address
              </span>
            )} */}
            {/* {emailExist && (
              <span className={styles.errorMessage}>
                {emailExist}
              </span>
            )} */}
          </div>


          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.inputLabel}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
            //   onChange={handleInputChange}
              className={`${styles.inputField} `} //${!isValid.password ? styles.inputError : ''} 
              placeholder="At least 8 characters"
            />
            {/* {!isValid.password && formData.password && (
              <span className={styles.errorMessage}>
                Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number.
              </span>
            )} */}
          </div>

          <div className={styles.termsContainer}>
            <p className={styles.termsText}>
              By continuing, you agree to Flipkart's{' '}
              <Link to="" className={styles.link}>
                Terms of Use
              </Link>{' '}
              and{' '}
              <Link to="" className={styles.link}>
                Privacy Policy
              </Link>
              .
            </p>
          </div>
          <button
            type="submit"
            className={styles.continueButton}
            // disabled={!isFormValid()}
          >
            CONTINUE
          </button>
          <div className={styles.loginLinkContainer}>
            <Link to="/User/Registration" className={styles.loginLink}>
              Create new Account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default UserLogin