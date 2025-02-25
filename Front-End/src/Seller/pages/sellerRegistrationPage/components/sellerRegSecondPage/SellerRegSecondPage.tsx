import React, { useEffect, useState } from 'react'
import styles from './SellerRegSecondPage.module.css'
import { FaArrowRight, FaEye, FaEyeSlash } from 'react-icons/fa'

const SellerRegSecondPage: React.FC = () => {

    const [passwordEye, setPasswordEye] = useState<boolean>(true)

    useEffect(() => {
        setPasswordEye(true)
    }, [])
    

    return (
        <div className={styles.full}>
            <div className={styles.verification}>We've sent a verification link to your email</div>
            <div className={styles.almost}>Almost there...</div>
            <div className={styles.weneed}>We need these details to set up your account.You can also choose to fill them in the next step.</div>
            <div className={styles.inp}>
                <div className={styles.input}>
                    <input type={passwordEye ? 'password' : "text"} placeholder='Create Password' />
                    <div className={styles.eye} onClick={() => setPasswordEye(!passwordEye)}>{passwordEye ? <FaEyeSlash/> : <FaEye/>}
                    </div>
                </div>
            </div>
            <div className={styles.suggest}>Suggest Password</div>
            <div className={styles.inp}>
                <div className={styles.input}>
                    <input type="text" placeholder='Enter Your Full Name' />
                </div>
            </div>
            <div className={styles.inp}>
                <div className={styles.input}>
                    <input type="text" placeholder='Enter Display Name' />
                </div>
            </div>
            <div className={styles.registerbtn}>Continue <FaArrowRight /></div>

        </div>

    )
}

export default SellerRegSecondPage