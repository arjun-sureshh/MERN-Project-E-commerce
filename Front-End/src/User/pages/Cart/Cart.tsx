import React from "react"
import styles from './Cart.module.css'
import CartProduct from "./components/cartproduct/CartProduct"
import CartTotalPrice from "./components/cartTotalprice/CartTotalPrice"

const Cart: React.FC = () => {
  return (
    <div className={styles.body}>
      <div>
        <div className={styles.product}>
          <CartProduct />
          <CartProduct />
          <CartProduct />
          <CartProduct />
        </div>

        <div className={styles.placeOrderSection}>
          <div className={styles.placeOrderButton}>Place Order</div>
        </div>
      </div>
      <div className={styles.totalPrice}>
        <CartTotalPrice />
      </div>

    </div>
  )
}

export default Cart