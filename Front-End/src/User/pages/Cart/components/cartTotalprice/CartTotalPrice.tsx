import React from 'react';
import styles from './CartTotalPrice.module.css'
import BodyName from './components/bodydetails/BodyName'
import { MdSecurity } from 'react-icons/md';



const CartTotalPrice:React.FC = () => {
  return (
    <div>
    <div className={styles.body}>
     <div className={styles.headName}>Price details</div>
     <div className={styles.priceDetails}>
        <BodyName headName="Price " itemsNo="1"  price="1,299"/>
        <BodyName headName="Discount " itemsNo=""  price="904"/>
        <BodyName headName="Platform Fee " itemsNo=""  price="3"/>
        <BodyName headName="Delivery Charges " itemsNo=""  price="Free"/>
     </div>
     <div className={styles.totalAmountSection}>
        <div className={styles.totalAmount}>Total Amount</div>
        <div className={styles.totalPrice}>₹398</div>
     </div>
     <div className={styles.savePrice}>You will save ₹901 on this order</div>
    </div>
    <div className={styles.securityMessage}>
        <div className={styles.icons}><MdSecurity/></div>
        <div className={styles.message}>Safe and Secure Payments.Easy returns.100% Authentic products.</div>
    </div>
    </div>
  )
}

export default CartTotalPrice