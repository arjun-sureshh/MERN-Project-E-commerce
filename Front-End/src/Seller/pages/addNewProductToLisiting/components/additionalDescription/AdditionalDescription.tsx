import React, { useRef, useState } from 'react'
import styles from './AdditionalDescription.module.css'
import { IoCheckmarkCircle } from 'react-icons/io5'
import { RootState } from '../../../../../redux/store'
import DisplayContainer from './components/displayfields/DisplayContainer'

const AdditionalDescription:React.FC = () => {

    const [displayadddisc, setDisplayadddisc] = useState<Boolean>(false)
  
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
        warantySummary: useRef<HTMLInputElement>(null),
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
       <div className={styles.title}>Additional Describtion (Optional) (0/21)</div>
       </div>
       { displayadddisc ?<div className={styles.flex}>
          <div className={styles.cancle} onClick={() => { setDisplayadddisc((!displayadddisc)) }}>Cancel</div>
          <div className={styles.savebtn}>Save</div>
        </div>
        :
        <div className={styles.editBtn} onClick={() => { setDisplayadddisc((!displayadddisc)) }}>Edit</div>}
    </div>
    <div className={styles.errorSection}></div>
    { displayadddisc &&
         <div className={styles.displayInputContainer}>
          <DisplayContainer  inputRefs={inputRefs} />
         </div> 
          }
   </div>
  )
}

export default AdditionalDescription