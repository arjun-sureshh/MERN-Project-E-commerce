import React, { useState } from 'react'
import styles from './PriceAndStock.module.css'
import { IoCheckmarkCircle } from 'react-icons/io5'
import DisplayInputContainer from './components/displayinputContainer/DisplayInputContainer'



const PriceAndStock: React.FC = () => {

  const [displaypricestock, setDisplaypricestock] = useState<Boolean>(false)
  
  return (
    <div className={styles.body}>
      <div className={`${styles.titleSection} ${ displaypricestock && styles.buttomBorder}`}>
        <div className={styles.icon_title}>
          <div className={styles.icon}><IoCheckmarkCircle /></div>
          <div className={styles.title}>Price, Stock and Shipping Information (0/21)</div>
        </div>
        { displaypricestock ?<div className={styles.flex}>
          <div className={styles.cancle} onClick={() => { setDisplaypricestock((!displaypricestock)) }}>Cancel</div>
          <div className={styles.savebtn} >Save</div>
        </div>
        :
        <div className={styles.editBtn} onClick={() => { setDisplaypricestock((!displaypricestock)) }}>Edit</div>}
      </div>
      { displaypricestock &&
         <div className={styles.displayInputContainer}>
          <DisplayInputContainer />
         </div> 
          }    
    </div>
  )
}

export default PriceAndStock