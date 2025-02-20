import React from 'react'
import styles from './AddNewList.module.css'

const AddNewList:React.FC = () => {
  return (
    <div className={styles.body}>
     <div className={styles.singlelisting}>Add Single Listing</div>
     <div className={styles.bullklisting}>Add Bulk Listing</div>

    </div>
  )
}

export default AddNewList