import React from 'react'
import styles from './Wishlist.module.css'
import WishlistProducts from './components/whishlistProducts/WishlistProducts'
import iphone from '../../../../../../../assets/iphone-black.jpg'

const Wishlist: React.FC = () => {
    return (
        <div className={styles.body}>
            <div className={styles.wishlistName}>My Wishlist <span className={styles.wishlistCount}>(64)</span></div>
            <div className={styles.wishlistProducts}>
                <WishlistProducts
                    img={iphone}
                    productName={"Apple iPhone 15 (Black, 128 GB)"}
                    productRating={"4.5"}
                    totalOrders={"1,234"}
                    sellingPrice={"58,999"}
                    MRP={"69,900"}
                    offerPer={"15"}
                />
                <WishlistProducts
                    img={iphone}
                    productName={"Apple iPhone 15 (Black, 128 GB)"}
                    productRating={"4.5"}
                    totalOrders={"1,234"}
                    sellingPrice={"58,999"}
                    MRP={"69,900"}
                    offerPer={"15"}
                /><WishlistProducts
                    img={iphone}
                    productName={"Apple iPhone 15 (Black, 128 GB)"}
                    productRating={"4.5"}
                    totalOrders={"1,234"}
                    sellingPrice={"58,999"}
                    MRP={"69,900"}
                    offerPer={"15"}
                /><WishlistProducts
                    img={iphone}
                    productName={"Apple iPhone 15 (Black, 128 GB)"}
                    productRating={"4.5"}
                    totalOrders={"1,234"}
                    sellingPrice={"58,999"}
                    MRP={"69,900"}
                    offerPer={"15"}
                /><WishlistProducts
                    img={iphone}
                    productName={"Apple iPhone 15 (Black, 128 GB)"}
                    productRating={"4.5"}
                    totalOrders={"1,234"}
                    sellingPrice={"58,999"}
                    MRP={"69,900"}
                    offerPer={"15"}
                />
            </div>
        </div>
    )
}

export default Wishlist