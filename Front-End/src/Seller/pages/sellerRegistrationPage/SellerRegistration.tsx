import React from 'react'
import styles from './sellerRegistration.module.css'
import { FaWebflow } from 'react-icons/fa6'
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import SellerRegFirstPage from './components/sellerRegistrationFirstPage/SellerRegFirstPage';
import SellerRegSecondPage from './components/sellerRegSecondPage/SellerRegSecondPage';
import SellerRegThirdPage from './components/sellerRegThirdPage/SellerRegThirdPage';


const SellerRegistration:React.FC = () => {
  return (
    <div className={styles.whole}>

    <div className={styles.nav}>
      <div className={styles.flow}><FaWebflow/></div>
      <div className={styles.webmart}>ebmart</div>
    </div>
    <div className={styles.icon}>
      <div className={styles.firsticon}>
        <div className={styles.tick}><CheckCircleOutlineRoundedIcon/></div><div className={styles.tickk}>EMAIL ID & GST</div>
      </div>
      <div className={styles.seccon}>
        <div className={styles.tick}><CheckCircleOutlineRoundedIcon /></div><div className={styles.tickk}>PASSWORD CREATION </div>
      </div>
      <div className={styles.seccon}>
        <div className={styles.tick}><CheckCircleOutlineRoundedIcon /></div><div className={styles.tickk}>ONBOARDING DASHBOARD </div>
      </div>
    </div>
    <SellerRegFirstPage/>
    {/* <SellerRegSecondPage/> */}
    {/* <SellerRegThirdPage/> */}

  </div>
  )
}

export default SellerRegistration

