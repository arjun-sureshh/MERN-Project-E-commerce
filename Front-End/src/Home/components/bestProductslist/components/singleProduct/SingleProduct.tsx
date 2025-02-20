import React from 'react'
import styles from './SingleProduct.module.css'
import img from '../../../../../assets/iphone-black.jpg'

const SingleProduct: React.FC = () => {
    return (
        <div className={styles.body}>
            <div className={styles.imgSec}>
                <img src={img} alt="abshs" />
            </div>
            <div className={styles.nameSec}>
                <div className={styles.productName}>Iphone</div>
                <div className={styles.highlightword}>shop now</div>
            </div>
        </div>
    )
}

export default SingleProduct