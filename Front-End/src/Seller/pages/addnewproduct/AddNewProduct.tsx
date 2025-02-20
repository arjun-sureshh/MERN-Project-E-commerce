import React from 'react'
import styles from './AddNewProduct.module.css'
import SubNav from '../mylisting/components/subNav/SubNav'
import img from '../../../assets/lens.jpg'

const AddNewProduct:React.FC = () => {
  return (
    <div className={styles.body}>
        <div className={styles.subNav}>
            <SubNav addnewlisting={true} subnavName={""}/>
        </div>
        <div className={styles.secSection}>
            <div className={styles.headingSection}>
                <div className={styles.headName0}>Listing in Progress :</div>
                <div className={styles.headName1}>Single Listings</div>
                <div className={styles.headName2}>Bulk Listings</div>
            </div>
            <div className={styles.tableSection}>
                <table>
                    <thead>
                        <tr>
                            <th>Product Details</th>
                            <th>Status</th>
                            <th>Created On</th>
                            <th>Updated On</th>
                            <th>Listing Improvement</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tr>
                        <th className={styles.imgTh}>
                            <div className={styles.imgInproductDetials}><img src={img} alt="" /></div>
                            <div className={styles.productNamesec}>
                                <div className={styles.productName}>Lunch_box</div>
                                <div className={styles.SkU_IDSec}><span className={styles.SKU_ID}>SKU_ID :</span> Abcd</div>
                            </div>
                        </th>
                        <th>Qc in Progress</th>
                        <th>Aug 10, 2024,11:42</th>
                        <th>Aug 10, 2024,11:42</th>
                        <th>NA</th>
                        <th>Delete</th>
                    </tr>
                </table>
            </div>
        </div>
    </div>
  )
}

export default AddNewProduct