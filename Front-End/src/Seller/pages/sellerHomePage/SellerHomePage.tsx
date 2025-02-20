import React from 'react'
import styles from './SellerHomePage.module.css'
import UpdatBox from './components/updateBox/UpdatBox'

const SellerHomePage:React.FC = () => {
  return (
    <div className={styles.body}>
       <div className={styles.yourDashboard}> Your Dashboard</div>
       <div className={styles.updatesSection}>
        <UpdatBox numbers={0} headName={"Units Sold"}/>
        <UpdatBox numbers={0} headName={"Sales"}/>
        <UpdatBox numbers={0} headName={"New Orders"}/>
        <UpdatBox numbers={0} headName={"Active Listings"}/>
       </div>
    </div>
  )
}

export default SellerHomePage