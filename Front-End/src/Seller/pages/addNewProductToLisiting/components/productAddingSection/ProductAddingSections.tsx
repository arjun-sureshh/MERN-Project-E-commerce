import React from 'react'
import styles from './ProductAddingSections.module.css'

const ProductAddingSections: React.FC = () => {
    return (
        <div className={styles.body}>
            <div className={styles.section1}>
                <div className={`${styles.steps}`}>
                    <div className={`${styles.number} ${styles.saved}`}>1</div>
                    <div className={styles.stepName}>Select Category</div>
                </div>
                <div className={styles.steps}>
                    <div className={styles.number}>1</div>
                    <div className={styles.stepName}>Select Category</div>
                </div>
                <div className={styles.steps}>
                    <div className={styles.number}>1</div>
                    <div className={styles.stepName}>Select Category</div>
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