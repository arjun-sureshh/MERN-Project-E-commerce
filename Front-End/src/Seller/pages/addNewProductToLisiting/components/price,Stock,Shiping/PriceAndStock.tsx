import React, { useRef, useState } from 'react'
import styles from './PriceAndStock.module.css'
import { IoCheckmarkCircle } from 'react-icons/io5'
import DisplayInputContainer from './components/displayinputContainer/DisplayInputContainer'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../../redux/store'



const PriceAndStock: React.FC = () => {

  const [displaypricestock, setDisplaypricestock] = useState<Boolean>(false)
  const productFields = useSelector((state: RootState) => state.toggle.productFields);

  // Store refs for each input field
  const inputRefs: Record<
    keyof RootState["toggle"]["productFields"],
    React.RefObject<HTMLInputElement>
  > = {
    mrp: useRef<HTMLInputElement>(null),
    fullfilementBy: useRef<HTMLInputElement>(null),
    ProcurementType: useRef<HTMLInputElement>(null),
    ProcurementSLA: useRef<HTMLInputElement>(null),
    sellingPrice: useRef<HTMLInputElement>(null),
    stock: useRef<HTMLInputElement>(null),
    shippingProvider: useRef<HTMLInputElement>(null),
    localDeliveryCharge: useRef<HTMLInputElement>(null),
    ZonalDeliveryCharge: useRef<HTMLInputElement>(null),
    nationalDeliveryCharge: useRef<HTMLInputElement>(null),
    length: useRef<HTMLInputElement>(null),
    breadth: useRef<HTMLInputElement>(null),
    height: useRef<HTMLInputElement>(null),
    weight: useRef<HTMLInputElement>(null),
    HSN: useRef<HTMLInputElement>(null),
    taxCode: useRef<HTMLInputElement>(null),
    countryOfOrigin: useRef<HTMLInputElement>(null),
    manufacturerDetails: useRef<HTMLInputElement>(null),
    packerDetails: useRef<HTMLInputElement>(null),
    skuId: useRef<HTMLInputElement>(null),
    productTitle: useRef<HTMLInputElement>(null),
    productDiscription: useRef<HTMLInputElement>(null),
    intheBox: useRef<HTMLInputElement>(null),
    minimumOrderQty: useRef<HTMLInputElement>(null),
    warantyType: useRef<HTMLInputElement>(null),
    warrantyPeriod: useRef<HTMLInputElement>(null),
    searchKeyword: useRef<HTMLInputElement>(null),
    featureTitle: useRef<HTMLInputElement>(null),
    featureContent: useRef<HTMLInputElement>(null)
  };


  const handleSave = () => {
   
  
    for (const key in productFields) {
      // Iterate only over valid keys
  for (const key of Object.keys(productFields) as (keyof typeof productFields)[]) {
    if (!productFields[key]) {  // Check if field is empty ("" or undefined/null)
      alert(`Please fill in the ${key} field.`);
      
      // Focus on the corresponding input field
      inputRefs[key]?.current?.focus();
      return;
    }
      }
    }

    console.log("All fields are filled:", productFields);

  };
  
  return (
    <div className={styles.body}>
      <div className={`${styles.titleSection} ${ displaypricestock && styles.buttomBorder}`}>
        <div className={styles.icon_title}>
          <div className={styles.icon}><IoCheckmarkCircle /></div>
          <div className={styles.title}>Price, Stock and Shipping Information (0/21)</div>
        </div>
        { displaypricestock ?<div className={styles.flex}>
          <div className={styles.cancle} onClick={() => { setDisplaypricestock((!displaypricestock)) }}>Cancel</div>
          <div className={styles.savebtn} onClick={handleSave} >Save</div>
        </div>
        :
        <div className={styles.editBtn} onClick={() => { setDisplaypricestock((!displaypricestock)) }}>Edit</div>}
      </div>
      { displaypricestock &&
         <div className={styles.displayInputContainer}>
          <DisplayInputContainer  inputRefs={inputRefs} />
         </div> 
          }    
    </div>
  )
}

export default PriceAndStock