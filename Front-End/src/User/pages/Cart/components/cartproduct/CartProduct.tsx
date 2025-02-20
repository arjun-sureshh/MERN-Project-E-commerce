import styles from './CartProduct.module.css'
import iphoneblack from '../../../../../assets/iphone-black.jpg'

const CartProduct = () => {
  return (
    <div className={styles.body}>
     <div className={styles.imageSection}>
        <div className={styles.productImage}>
          <img src={iphoneblack} alt="product image" />
        </div>
     </div>
     <div className={styles.NameSection}>
        <div className={styles.name}>realme P1 Speed 5G (Textured Titanium, 128 GB)</div>
        
        <div className={styles.sellerName}>Seller:XONIGHT E-Commerce</div>
        <div className={styles.removefromcart}>Remove</div>

     </div>
     <div className={styles.priceSection}>
      <div className={styles.sellingPrice}>₹19,998.00</div>
      <div className={styles.MRP}>M.R.P: <span className={styles.strick}>₹999.00</span></div>
     </div>
    </div>
  )
}

export default CartProduct