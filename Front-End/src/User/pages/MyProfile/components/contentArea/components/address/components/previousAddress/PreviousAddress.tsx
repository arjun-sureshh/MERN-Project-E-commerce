import React from 'react'
import styles from './PreviousAddress.module.css'
import LongMenu from './components/dotMenu/LongMenu'

interface previousAddressProps{
    home:string;
    fullName:string;
    mobileNO:number;
    fullAddress:string;
    pinNO:number;
}

const PreviousAddress:React.FC<previousAddressProps> = ({home,fullAddress,fullName,mobileNO,pinNO}) => {
  return (
    <div className={styles.body}>
    <div className={styles.section1}>
        <div className={styles.addressType}>{home}</div>
        <div className={styles.dots}>
            <LongMenu/>
        </div>
    </div>
    <div className={styles.section2}>
        <div className={styles.fullName}>{fullName}</div>
        <div className={styles.mobileNumber}>{mobileNO}</div>
    </div>
    <div className={styles.section3}>
        <div className={styles.fullAddress}>
       {fullAddress}
            <span className={styles.pinNo}> - {pinNO}</span>
        </div>
    </div>

    </div>
  )
}

export default PreviousAddress