import React from 'react';
import styles from './CartTotalPrice.module.css';
import BodyName from './components/bodydetails/BodyName';
import { MdSecurity } from 'react-icons/md';

interface CartTotalPriceProps {
  cartItems: any[]; // Adjust type based on backend response
}

const CartTotalPrice: React.FC<CartTotalPriceProps> = ({ cartItems }) => {
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.sellingPrice || 0), 0);
  const discount = cartItems.reduce((sum, item) => sum + ((item.mrp || 0) - (item.sellingPrice || 0)), 0);
  const platformFee = 3; // Fixed for now, adjust as needed
  const deliveryCharges = 0; // Free for now, adjust as needed
  const finalTotal = totalPrice - discount + platformFee + deliveryCharges;

  return (
    <div>
      <div className={styles.body}>
        <div className={styles.headName}>Price details</div>
        <div className={styles.priceDetails}>
          <BodyName headName="Price" itemsNo={cartItems.length} price={totalPrice.toFixed(2)} />
          <BodyName headName="Discount" itemsNo={null} price={discount.toFixed(2)} />
          <BodyName headName="Platform Fee" itemsNo={null} price={platformFee.toFixed(2)} />
          <BodyName headName="Delivery Charges" itemsNo={null} price={deliveryCharges.toFixed(2)} />
        </div>
        <div className={styles.totalAmountSection}>
          <div className={styles.totalAmount}>Total Amount</div>
          <div className={styles.totalPrice}>₹{finalTotal.toFixed(2)}</div>
        </div>
        <div className={styles.savePrice}>You will save ₹{discount.toFixed(2)} on this order</div>
      </div>
      <div className={styles.securityMessage}>
        <div className={styles.icons}><MdSecurity /></div>
        <div className={styles.message}>Safe and Secure Payments. Easy returns. 100% Authentic products.</div>
      </div>
    </div>
  );
};

export default CartTotalPrice;