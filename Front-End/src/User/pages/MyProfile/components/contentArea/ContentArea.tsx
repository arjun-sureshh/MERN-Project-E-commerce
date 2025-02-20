import React from 'react'
import styles from './ContentArea.module.css'
import UserInformation from './components/userInformation/UserInformation'
import Address from './components/address/Address'
import Wishlist from './components/wishlist/Wishlist'

const ContentArea:React.FC = () => {
  return (
    <div className={styles.body}>
     {/* <UserInformation/> */}
     {/* <Address/> */}
     <Wishlist/>
    </div>
  )
}

export default ContentArea