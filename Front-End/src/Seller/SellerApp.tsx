import React from 'react'
import styles from './SellerApp.module.css'
import SellerRouters from './sellerRouters/SellerRouters'
import NavBar from './components/navBar/NavBar'

const SellerApp:React.FC = () => {
  return (
    <div className={styles.body}>
        <div className={styles.navBar}>
        <NavBar/>
        </div>
        <div className={styles.content}>
        <SellerRouters/>
        </div> 
     
    </div>
  )
}

export default SellerApp