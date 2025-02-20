import React from 'react'
import styles from './UpdateBox.module.css'

interface UpdateBposProps{
    numbers:number;
    headName:string;
}

const UpdatBox:React.FC<UpdateBposProps> = ({numbers,headName}) => {
  return (
    <div className={styles.body}>
         <div className={styles.numbers}>{headName ==="Sales" && "₹"}{numbers}</div>
         <div className={styles.headName}>{headName}</div>
    </div>
  )
}

export default UpdatBox