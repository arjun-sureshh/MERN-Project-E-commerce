import React from 'react'
import styles from './BestProductList.module.css'
import SingleProduct from './components/singleProduct/SingleProduct'
import { IoArrowForwardCircleSharp } from 'react-icons/io5'

const BestProductLIst:React.FC = () => {
  return (
    <div className={styles.body}>

        <div className={styles.title}>Best Of Electronics <span className={styles.icon}><IoArrowForwardCircleSharp/></span></div>
        <div className={styles.productsRow}>
        <SingleProduct/>
        <SingleProduct/>
        <SingleProduct/>
        <SingleProduct/>
        <SingleProduct/>
        <SingleProduct/>
        <SingleProduct/>
        </div>
        
    </div>
  )
}

export default BestProductLIst