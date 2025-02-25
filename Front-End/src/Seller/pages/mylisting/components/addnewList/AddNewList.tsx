import React from 'react'
import styles from './AddNewList.module.css'
import { Link } from 'react-router';

interface AddNewListProps {
linPath:string;
}

const AddNewList:React.FC<AddNewListProps> = ({linPath}) => {

  
  return (
    <div className={styles.body}>
     <><Link to={linPath} className={styles.singlelisting}> Add Single Listing </Link></>
     <div className={styles.bullklisting}>Add Bulk Listing</div>

    </div>
  )
}

export default AddNewList