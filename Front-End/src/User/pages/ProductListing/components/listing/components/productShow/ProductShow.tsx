import React, { useState } from "react"
import styles from './ProductShow.module.css'
import headset  from '../../../../../../../assets/headset.jpg';
import { FaStar } from "react-icons/fa";
import FavoriteIcon from '@mui/icons-material/Favorite';

const ProductShow:React.FC = () => {

    const [wishlist, setWishlist] = useState<boolean>(false)

  return (
    <div className={styles.body}>
        <div className={styles.conatiner}>
            <div className={styles.imageSection}>
                <div className={`${styles.wishList} ${wishlist ?  styles.red  : styles.gray}` } onClick={() => {setWishlist(!wishlist)}}>
                <FavoriteIcon style={{ fontSize: '19px' }} />
                    </div>
                <div className={styles.image}><img src={headset} alt="" /> </div>
            </div>
            <div className={styles.detailSection}>
              
                <div className={styles.name_Price}>
                <div className={styles.varientName}>Apple iPhone 15 (Green, 128 GB)</div>
                <div className={styles.rating}>
                    <span className={styles.avgRating}>4.6 <FaStar /></span>
                    <span className={styles.totalRating_Review}>
                        <span className={styles.totalRating}>2,27,620 Ratings</span>
                        <span className={styles.and}>&</span>
                        <span className={styles.totalReview}> 8,136 Reviews</span>
                    </span>
                </div>
               
                <div className={styles.pricesection}>
                    <span className={styles.sellingPrice}>₹58,999</span>
                    <span className={`${styles.MRP} ${styles.strick}`}>₹69,900</span>
                    <span className={styles.offerPer}>15% off</span>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default ProductShow