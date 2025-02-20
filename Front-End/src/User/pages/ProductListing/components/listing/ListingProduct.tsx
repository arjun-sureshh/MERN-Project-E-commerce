import React from 'react'
import styles from './ListingProduct.module.css'
import ProductShow from './components/productShow/ProductShow'

const ListingProduct:React.FC = () => {
  return (
    <div className={styles.body}>
    <div className={styles.productsRow}>
        <ProductShow/>
        <ProductShow/>
        <ProductShow/>
        <ProductShow/>
        <ProductShow/>
        <ProductShow/>
        <ProductShow/>
        <ProductShow/>
    </div>
    </div>
  )
}

export default ListingProduct