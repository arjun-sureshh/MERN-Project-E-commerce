import React, { useState } from 'react'
import styles from './ProductAddingSections.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../../redux/store'
import { GiCheckMark } from "react-icons/gi";
import axios from 'axios';

const ProductAddingSections: React.FC = () => {
// const dispatch = useDispatch();
    const productAdddingState = useSelector((state: RootState) => state.toggle.productAdddingState) ?? 0;
    const productId = useSelector((state: RootState) => state.toggle.productId);
    const productFields = useSelector((state: RootState) => state.toggle.productFields);
    const [ProductVaraintId, setProductVaraintId] = useState<string>("");
    const produKeyFeature = useSelector((state: RootState) => state.toggle.features);
    const searchKeyWords = useSelector((state: RootState) => state.toggle.searchKeyWords);
    const productImage = useSelector((state: RootState) => state.toggle.images);




// update the skuid and fulfilemt by into the product collection
    const updateIntoProduct = async () =>{

        if (!productId) {
            alert("Missing product ID");
            return;
        }    
        try {
          const response = await axios.put(`http://localhost:5000/api/product/skuidUpdate/${productId}`, { // ✅ Corrected URL
            skuId: productFields.skuId ,fulfilmentBy:productFields.fullfilementBy, // Ensure key matches backend expectations
        });
        console.log(response.data.message);       
        } catch (error) {
            console.error("Error updating skuId, Fulfilemt By:", error);
        }
    };

// create an empty variant of the product first when we click the save and btn
const  createProductVaraint= async () =>{

    if (!productId) {
        alert("Missing product ID");
        return;
    }

    try {
      const response = await axios.post(`http://localhost:5000/api/productvaraint`, { // ✅ Corrected URL
        productId:productId,
    });
    const productVaraintId = response.data.data._id;
    setProductVaraintId(productVaraintId);
    console.log(response.data);       
    } catch (error) {
     console.error("Error updating :", error);
    }
};


// create other fields into productvarient
const  updateProductVariant= async () =>{

    if (!ProductVaraintId) {
        alert("Missing product ID");
        return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/productvaraint/updateVaraint/${ProductVaraintId}`, { // ✅ Corrected URL
        productId:productId,
        mrp:productFields.mrp,
        sellingPrice:productFields.sellingPrice,
        minimumOrderQty:productFields.minimumOrderQty,
        shippingProvider:productFields.shippingProvider,
        Length:productFields.length,
        breadth:productFields.breadth,
        weight:productFields.weight,
        hsnCode:productFields.HSN,
        taxCode:productFields.taxCode,
        countryOfOrgin:productFields.countryOfOrigin,
        manufactureDetails:productFields.manufacturerDetails,
        packerDetails:productFields.packerDetails,
        productDiscription:productFields.productDiscription,
        productTitle:productFields.productTitle,
        intheBox:productFields.intheBox,
        warrantyPeriod:productFields.warrantyPeriod,
        warantySummary:productFields.warantySummary,
    });
    console.log(response.data.message);       
    } catch (error) {
     console.error("Error updating :", error);
    }
};

// handle key features
const handleKeyFeatures = async () => {

    if (!ProductVaraintId) {
        alert("Missing product ID");
        return;
    }

    try {
        const response = await axios.post(`http://localhost:5000/api/keyfeatures`, { 
            productVariantId: ProductVaraintId,
            features: produKeyFeature // ✅ Pass an array of { title, content }
        });

        console.log(response.data.message);
    } catch (error) {
        console.error("Error updating:", error);
    }
};

//  insert the search key Words
const handleSearchKeywords = async () => {
    if (!ProductVaraintId) {
        alert("Missing product ID");
        return;
    }

    try {
        const response = await axios.post(`http://localhost:5000/api/searchkeyword`, { 
            productVariantId: ProductVaraintId,
            searchKeyWords: searchKeyWords // ✅ Pass an array of { searchKeyWord }
        });

        console.log(response.data.message);
    } catch (error) {
        console.error("Error updating:", error);
    }
};

// insert images 

const handleImage = async() =>{
    if (!ProductVaraintId) {
        alert("Missing product ID");
        return;
    }

    try {
        const response = await axios.post(`http://localhost:5000/api/gallery`, { 
            productVariantId: ProductVaraintId,
            productImage: productImage // ✅ Pass an array of { searchKeyWord }
        });

        console.log(response.data.message);
    } catch (error) {
        console.error("Error updating:", error);
    }
}
 
// handle Save And Back Button........
const handleSaveAndBack =() =>{

    updateIntoProduct();
    if(!ProductVaraintId){
        createProductVaraint(); 
    }
   
    console.log(ProductVaraintId);
    updateProductVariant();
    handleKeyFeatures();
    handleSearchKeywords();
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