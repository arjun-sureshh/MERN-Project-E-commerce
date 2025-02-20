import React, { useState } from 'react'
import styles from './AdditionalDescription.module.css'
import { IoCheckmarkCircle } from 'react-icons/io5'

const AdditionalDescription:React.FC = () => {

    const [displayadddisc, setDisplayadddisc] = useState<Boolean>(false)
  

  return (
    <div className={styles.body}>
    <div className={styles.titleSection}>
       <div className={styles.icon_title}>
       <div className={styles.icon}><IoCheckmarkCircle/></div>
       <div className={styles.title}>Price, Stock and Shipping Information (0/21)</div>
       </div>
       { displayadddisc ?<div className={styles.flex}>
          <div className={styles.cancle} onClick={() => { setDisplayadddisc((!displayadddisc)) }}>Cancel</div>
          <div className={styles.savebtn}>Save</div>
        </div>
        :
        <div className={styles.editBtn} onClick={() => { setDisplayadddisc((!displayadddisc)) }}>Edit</div>}
    </div>
    <div className={styles.errorSection}></div>
   </div>
  )
}

export default AdditionalDescription