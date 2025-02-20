import React, { useState } from 'react'
import styles from './AdminChangePassword.module.css'
import { useDispatch } from 'react-redux';
import { togglePageControl } from '../../../redux/toogleSlice';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import axios from 'axios';

interface InputData {
    adminEmail: string;
    adminPassword: string;
}
interface fetchData {
    adminEmail: string;
    adminPassword: string;
}

const AdminChangePassword: React.FC = () => {

  const dispatch = useDispatch(); // dispatch method in redux
  const [step, setStep] = useState(1);

    const [id, setId] = useState<string>("67b437ba9acde33aace70f15") // store the id
  
const [inputData, setInputData] = useState<InputData>({
    adminEmail: "",
    adminPassword: ""
  }) // handle the data from input and fetched data
   const [alldata, setAlldata] = useState<fetchData>({
    adminEmail: "",
    adminPassword: ""
   }) // handle all fetch data



    // handle change occures in this    
      const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputData({
          ...inputData,
          [e.target.name]: e.target.value
        })
      }

       // fetch data from the back end 
  const fetchData = async () => {
    if (!id) {
      throw new Error(" ID is required");
    }
    try {
      const response = await axios.get(`http://localhost:5000/api/admin/${id}`);
      const data = response.data.data;

      setAlldata(response.data.data)
    } catch (error) {
      console.error("Error Deleting admin account Detials:", error);
    }
  }

    return (
        <div className={styles.changePasswordContainer}>
            
            <div className={styles.formBox}>
            <div className={styles.moveBack}>
          <p className={styles.link} onClick={() => dispatch(togglePageControl("AdminProfile"))}><IoArrowBackCircleOutline/></p>
        </div>
                <h2 className={styles.heading}>Change Password</h2>
                <p className={styles.subText}>Secure your account with a new password</p>

                <form className={styles.form}>
                    {step === 1 && (
                        <>
                            <input type="email" placeholder="Enter your Email" className={styles.input}  onChange={handleChange}/>
                            <button type="button" className={`${styles.button} ${styles.saveButton}`} onClick={() => setStep(2)}>
                                Get OTP
                            </button>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <div className={styles.otpContainer}>
                                <input type="text" maxLength={1} className={styles.otpBox} />
                                <input type="text" maxLength={1} className={styles.otpBox} />
                                <input type="text" maxLength={1} className={styles.otpBox} />
                                <input type="text" maxLength={1} className={styles.otpBox} />
                            </div>
                            <button type="button" className={`${styles.button} ${styles.saveButton}`} onClick={() => setStep(3)}>
                                Verify OTP
                            </button>
                        </>
                    )}
                    {step === 3 && (
                        <>
                            <input type="password" placeholder="New Password" className={styles.input} onChange={handleChange} />
                            <input type="password" placeholder="Confirm New Password" className={styles.input} />

                            <p className={styles.errorText}>Passwords do not match</p>

                            <button type="submit" className={`${styles.button} ${styles.saveButton}`}>
                                Update Password
                            </button>
                        </>
                    )}

                    <button type="button" className={`${styles.button} ${styles.cancelButton}`} onClick={() => setStep(1)}>
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AdminChangePassword