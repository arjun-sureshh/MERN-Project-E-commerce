import React from 'react'
import styles from './DisplayInputContainer.module.css'
import InputBox from '../../../components/inputbox/InputBox'
import SelectBox from '../../../components/selectBox/SelectBox'
import { RootState } from '../../../../../../../redux/store';

type DisplayInputContainerProps = {
  inputRefs: Record<
  keyof RootState["toggle"]["productFieldsPriceAndStock"],
  React.RefObject<HTMLInputElement>
>;
};

const DisplayInputContainer:React.FC<DisplayInputContainerProps> = ({inputRefs}) => {
  return (
    <div className={styles.inputwholeContainer}>
        <InputBox headName={"Listing information"}   attributeName={"Seller SKU ID "} ref={inputRefs["skuId"]} name={'skuId'} inputContain={""}/>
        <InputBox headName={"Price details"} attributeName={"MRP"} ref={inputRefs["mrp"]} name={"mrp"} inputContain={"INR"}/>
        <InputBox headName={""} attributeName={"Your selling price"} ref={inputRefs["sellingPrice"]} name={"sellingPrice"} inputContain={"INR"}/>

        {/* <SelectBox headName={"Status Details"} attributeName={"Listing Status "} inputContain={["Active","Inactive"]} /> */}

        <SelectBox headName={"Inventory details"} attributeName={"Fullfilment by"} name={"fullfilementBy"} inputContain={["Seller"]} />
        <SelectBox headName={""} attributeName={"Procurement type "}  name={"ProcurementType"} inputContain={["Instock","Express","Domestic Procurement","Made To Order"]} />
        <InputBox headName={""} attributeName={"Procurement SLA"} ref={inputRefs["ProcurementSLA"]} name={"ProcurementSLA"} inputContain={"DAY"}/>
        <InputBox headName={""} attributeName={"Stock"} ref={inputRefs["stock"]} name={"stock"} inputContain={""}/>
  
        <SelectBox headName={""} attributeName={"Shipping provider"} name={"shippingProvider"} inputContain={["FlipKart"]} />

        <InputBox headName={"Delivery charge to customer"} attributeName={"Local delivery charge "} ref={inputRefs["localDeliveryCharge"]} name={"localDeliveryCharge"} inputContain={"INR"}/>
        <InputBox headName={""} attributeName={"Zonal delivery charge "} name={"ZonalDeliveryCharge"} ref={inputRefs["ZonalDeliveryCharge"]} inputContain={"INR"}/>
        <InputBox headName={""} attributeName={"National delivery charge "} name={"nationalDeliveryCharge"} ref={inputRefs["nationalDeliveryCharge"]} inputContain={"INR"}/>

        <InputBox headName={"Package details"} attributeName={"Length"} ref={inputRefs["length"]} name={"length"} inputContain={"CM"}/>
        <InputBox headName={""} attributeName={"Breadth "} ref={inputRefs["breadth"]} name={"breadth"} inputContain={"CM"}/>
        <InputBox headName={""} attributeName={"Height"} ref={inputRefs["height"]} name={"height"} inputContain={"CM"}/>
        <InputBox headName={""} attributeName={"Weight "} ref={inputRefs["weight"]} name={"weight"} inputContain={"CM"}/>

        <InputBox headName={"Tax details"} attributeName={"HSN"} ref={inputRefs["HSN"]} name={"HSN"} inputContain={""}/>
        <SelectBox headName={""} attributeName={"Tax Code"} name={"taxCode"} inputContain={["GST_0","GST_12","GST_18","GST_28","GST_3","GST_5","GST_APPAREL"]} />

        </div>
  )
}

export default DisplayInputContainer