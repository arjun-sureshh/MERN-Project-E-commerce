import React from 'react'
import styles from './AttributeBox.module.css'

interface AttributeBoxProps{
    attributeName : String;
}

const AttributeBox:React.FC<AttributeBoxProps> = ({attributeName}) => {
  return (
    <div className={styles.body}>
        <div className={styles.nameBox}>
            <div className={styles.name}>{attributeName}</div>
            <div className={styles.star}>*</div>
        </div>
    </div>
  )
}

export default AttributeBox