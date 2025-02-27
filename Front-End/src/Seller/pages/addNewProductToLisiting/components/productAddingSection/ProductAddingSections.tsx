import React from 'react'
import styles from './ProductAddingSections.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../../redux/store'
import { GiCheckMark } from "react-icons/gi";
import axios from 'axios';
import { toggleProductAddingState } from '../../../../../redux/toogleSlice';

const ProductAddingSections: React.FC = () => {
const dispatch = useDispatch();
    const productAdddingState = useSelector((state: RootState) => state.toggle.productAdddingState) ?? 0;
     const productId = useSelector((state: RootState) => state.toggle.productId);
    const skuId = useSelector((state: RootState) => state.toggle.productFields["skuId"]);
    const fullfilementBy = useSelector((state: RootState) => state.toggle.productFields["fullfilementBy"]);


    // update the skuid and fulfilemt by into the product collection
    const updateIntoProduct = async () =>{

        if (!productId || !skuId || !fullfilementBy) {
            alert("Missing fullfilemrntBy or skuId ");
            return;
        }
    
        try {
          const response = await axios.put(`http://localhost:5000/api/product/skuidUpdate/${productId}`, { // ✅ Corrected URL
            skuId: skuId ,fulfilmentBy:fullfilementBy, // Ensure key matches backend expectations
           ListingStatus:3
        });
        console.log(response.data.message);
        
        } catch (error) {
            console.error("Error updating skuId, Fulfilemt By:", error);
        }
    }
    
const handleSaveAndBack =() =>{
 
    updateIntoProduct();

}

    return (
        <div className={styles.body}>
            <div className={styles.section1}>
                <div className={`${styles.steps}`}>
                    <div className={`${styles.number}  ${productAdddingState === 1 ? styles.processing : productAdddingState >= 2 ? styles.saved :""}`}>
                         { productAdddingState >=2 ?  <GiCheckMark/>: 1 }
                         </div>
                    <div className={styles.stepName}>Select Category</div>
                </div>
                <div className={styles.steps}>
                    <div  className={`${styles.number}  ${productAdddingState === 2 ? styles.processing : productAdddingState >= 3 ? styles.saved :""}`}>
                        { productAdddingState >= 3 ? <GiCheckMark/> : 2  }</div>
                    <div className={styles.stepName}>Select Brand</div>
                </div>
                <div className={styles.steps}>
                    <div  className={`${styles.number}  ${productAdddingState === 3 ? styles.processing : productAdddingState > 3 ? styles.saved :""}`}>
                    { productAdddingState > 3 ? <GiCheckMark/> : 3 }
                    </div>
                    <div className={styles.stepName}>Add Product Details</div>
                </div>
            </div>
            <div className={styles.section2}>
                <div className={styles.btn} onClick={handleSaveAndBack}>Save & Go Back</div>
                <div className={styles.btn}>Send to QC</div>
            </div>
        </div>
    )
}

export default ProductAddingSections