import React from 'react'
import styles from './SellerRegFirstPage.module.css'
import { FaArrowRight } from 'react-icons/fa'


const SellerRegFirstPage: React.FC = () => {
    return (
        <div>
            <div className={styles.inp}> 
                <div className={styles.input}>
                    <input type="text" placeholder='Enter Mobile Number' />
                    </div>
                    </div>
            <div className={styles.inp}>
                 <div className={styles.input}>
                    <input type="text" placeholder='Email Id' />
                    </div>
                    </div>
            <div className={styles.inp}> 
                <div className={styles.input}>
                    <input type="text" placeholder='Enter GSTIN' />
                    </div>
                    </div>
            <div className={styles.whatt}>GSTIN is required to sell products on BeeStore. You can also share it in the final step.</div>
            <div className={styles.whattt}>By continuing, I agree to BeeStore's Terms of Use & Privacy Policy</div>
            <div className={styles.register}>
                <div className={styles.registerbtn}> Register & Continue <FaArrowRight /></div>
            </div></div>

    )
}

export default SellerRegFirstPage