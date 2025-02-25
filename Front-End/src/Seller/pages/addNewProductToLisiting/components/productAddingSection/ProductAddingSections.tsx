import React from 'react'
import styles from './ProductAddingSections.module.css'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../../redux/store'
import { GiCheckMark } from "react-icons/gi";

const ProductAddingSections: React.FC = () => {

  const productAdddingState = useSelector((state: RootState) => state.toggle.productAdddingState)


    return (
        <div className={styles.body}>
            <div className={styles.section1}>
                <div className={`${styles.steps}`}>
                    <div className={`${styles.number}  ${productAdddingState === 1 ? styles.processing : productAdddingState >= 2 ? styles.saved :""}`}>
                         { productAdddingState >=2 ?  <GiCheckMark/>: 1 }
                         </div>
                    <div className={styles.stepName}>Select Category</div>
                </div>
                <div className={styles.steps}>
                    <div  className={`${styles.number}  ${productAdddingState === 2 ? styles.processing : productAdddingState >= 3 ? styles.saved :""}`}>
                        { productAdddingState >= 3 ? <GiCheckMark/> : 2  }</div>
                    <div className={styles.stepName}>Select Brand</div>
                </div>
                <div className={styles.steps}>
                    <div  className={`${styles.number}  ${productAdddingState === 3 ? styles.processing : productAdddingState > 3 ? styles.saved :""}`}>
                    { productAdddingState > 3 ? <GiCheckMark/> : 3 }
                    </div>
                    <div className={styles.stepName}>Add Product Details</div>
                </div>
            </div>
            <div className={styles.section2}>
                <div className={styles.btn}>Save & Go Back</div>
                <div className={styles.btn}>Send to QC</div>
            </div>
        </div>
    )
}

export default ProductAddingSections