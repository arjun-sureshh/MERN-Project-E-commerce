import React, { useRef, useState } from 'react'
import styles from './ProductDescription.module.css'
import { IoCheckmarkCircle } from 'react-icons/io5'
import { RootState } from '../../../../../redux/store'
import { useSelector } from 'react-redux'
import DisplayContainer from './components/displayContainer/DisplayContainer'

const ProductDescription:React.FC = () => {

  const [displayprodisc, setDisplayprodisc] = useState<Boolean>(false)
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

  return (
    <div className={styles.body}>
    <div className={styles.titleSection}>
       <div className={styles.icon_title}>
       <div className={styles.icon}><IoCheckmarkCircle/></div>
       <div className={styles.title}>Product Describtion & Manufacturing Details(0/21)</div>
       </div>
       { displayprodisc ?<div className={styles.flex}>
          <div className={styles.cancle} onClick={() => { setDisplayprodisc((!displayprodisc)) }}>Cancel</div>
          <div className={styles.savebtn}>Save</div>
        </div>
        :
        <div className={styles.editBtn} onClick={() => { setDisplayprodisc((!displayprodisc)) }}>Edit</div>}
    </div>
    <div className={styles.errorSection}></div>
    { displayprodisc &&
         <div className={styles.displayInputContainer}>
          <DisplayContainer  inputRefs={inputRefs}/>
         </div> 
          }   
   </div>
  )
}

export default ProductDescription