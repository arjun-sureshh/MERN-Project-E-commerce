import React, { useState } from 'react'
import styles from './ProductDescription.module.css'
import { IoCheckmarkCircle } from 'react-icons/io5'

const ProductDescription:React.FC = () => {

  const [displayprodisc, setDisplayprodisc] = useState<Boolean>(false)


  return (
    <div className={styles.body}>
    <div className={styles.titleSection}>
       <div className={styles.icon_title}>
       <div className={styles.icon}><IoCheckmarkCircle/></div>
       <div className={styles.title}>Price, Stock and Shipping Information (0/21)</div>
       </div>
       { displayprodisc ?<div className={styles.flex}>
          <div className={styles.cancle} onClick={() => { setDisplayprodisc((!displayprodisc)) }}>Cancel</div>
          <div className={styles.savebtn}>Save</div>
        </div>
        :
        <div className={styles.editBtn} onClick={() => { setDisplayprodisc((!displayprodisc)) }}>Edit</div>}
    </div>
    <div className={styles.errorSection}></div>
   </div>
  )
}

export default ProductDescription