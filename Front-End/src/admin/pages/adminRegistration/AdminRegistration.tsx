import React, { useRef, useState } from "react";
import styles from "./AdminRegistration.module.css";
import axios from "axios";
import { TextField } from "@mui/material";

interface InputData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string
}

const AdminRegister: React.FC = () => {

  const formref = useRef<HTMLFormElement | null>(null)
  const [inputData, setInputData] = useState<InputData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  }) // handle the data from inout
  const [error, setError] = useState<InputData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  }) // handle when we submit with out data
  const [passworderror, setPasswordError] = useState<string>("") // handle the error based on password
  const [backEndError, setBackEndError] = useState<string>("") // handle the back end error 
  const [dataAdded, setDataAdded] = useState<Record<string, any>>({}); //handle addededData


  // handle the onchange function 

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value
    })
  }

  //  handle the submit button 
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError({
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }); // Clear previous errors
    setBackEndError(""); // Clear backend error message
    setPasswordError("")

    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    // fun tion for focus
    const focusInput = (name: string) => {
      const input = formref.current?.querySelector(`TextField[name='${name}']`) as HTMLInputElement | null;
      input?.focus(); // Now TypeScript knows it's an input field
    };

    // Frontend validation
    if (!inputData.name) {
      setError({
        ...error,
        name: "Name is required",
      });
      focusInput("name");
      return;
    }
    if (!inputData.email) {
      setError({
        ...error,
        email: "Email is required",
      });
      focusInput("email");
      return;
    }
    if (!inputData.password) {
      setError({
        ...error,
        password: "password is required",
      });
      focusInput("password");
      return;
    }
    if(!strongPasswordRegex.test(inputData.password)) {
      setPasswordError(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number."
      );
      focusInput("password"); 
      return;
    }
    if (!inputData.confirmPassword) {
      setError({
        ...error,
        confirmPassword: "confirm password is required",
      });
      focusInput("confirmPassword");
    }
    if (inputData.password !== inputData.confirmPassword) {
      setPasswordError("Passwords do not match");
      focusInput("confirmPassword");
      return;
    }

    //  data set
    const data = {
      adminName: inputData.name,
      adminEmail: inputData.email,
      adminPassword: inputData.password,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/admin", data);

      setDataAdded(response.data); // Save response data
      setInputData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        setBackEndError(error.response.data.message); // Update error state
      } else {
        setBackEndError("Something went wrong. Please try again.");
      }
    }
  };

  // cancel the form element 

  const reset = () => {
    setInputData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setError({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setBackEndError("");
    setDataAdded({});
    setPasswordError("")
  }

  return (
    <div className={styles.adminRegisterContainer}>
      <h2 className={styles.heading}>Admin Registration</h2>
      <form className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
        ref={formref}
      >
        <TextField
          label={"name"}
          type="text"
          name="name"
          value={inputData.name}
          onChange={handleChange}
          placeholder="Enter admin Name"
          className={styles.input}
          fullWidth
          error={!!error.name && !inputData.name} // Show error if the field is empty
          helperText={error.name && !inputData.name ? error.name : ""}
        />
        <TextField
          label="email"
          type="email"
          name="email"
          value={inputData.email}
          onChange={handleChange}
          placeholder="email@gmail.com"
          className={styles.input}
          fullWidth
          error={!!error.email && !inputData.email} // Show error if the field is empty
          helperText={error.email && !inputData.email ? error.email : ""}
        />
        {backEndError && <div className={styles.passwordError}>{backEndError}</div>}
        <TextField
          label="password"
          type="password"
          name="password"
          value={inputData.password}
          onChange={handleChange}
          placeholder="enter you password"
          className={styles.input}
          fullWidth
          error={!!error.password && !inputData.password} // Show error if the field is empty
          helperText={error.password && !inputData.password ? error.password : ""}
        />
        {passworderror === "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number." && <div className={styles.passwordError}>{passworderror}</div>}
        <TextField
          label="confirm password"
          type="password"
          name="confirmPassword"
          value={inputData.confirmPassword}
          onChange={handleChange}
          placeholder="enter you password again"
          className={styles.input}
          fullWidth
          error={!!error.confirmPassword && !inputData.confirmPassword} // Show error if the field is empty
          helperText={error.confirmPassword && !inputData.confirmPassword ? error.confirmPassword : ""}
        />
        {passworderror === "Passwords do not match" && <div className={styles.passwordError}>{passworderror}</div>}

        <div className={styles.btnSection}>
          <button type="button" className={styles.button} onClick={reset}>cancle</button>
          <button type="submit" className={styles.button}>Register</button>
        </div>
      </form>
    </div>
  );
};

export default AdminRegister;
