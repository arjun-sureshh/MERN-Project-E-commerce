import React from 'react'
import styles from './DisplayInputContainer.module.css'
import InputBox from '../../../components/inputbox/InputBox'
import SelectBox from '../../../components/selectBox/SelectBox'

const DisplayInputContainer:React.FC = () => {
  return (
    <div className={styles.inputwholeContainer}>
        <InputBox headName={"Listing information"} attributeName={"Seller SKU ID "} inputContain={""}/>
        <InputBox headName={"Price details"} attributeName={"MRP"} inputContain={"INR"}/>
        <InputBox headName={""} attributeName={"Your selling price"} inputContain={"INR"}/>

        {/* <SelectBox headName={"Status Details"} attributeName={"Listing Status "} inputContain={["Active","Inactive"]} /> */}

        <SelectBox headName={"Inventory details"} attributeName={"Fullfilment by"} inputContain={["Seller"]} />
        <SelectBox headName={""} attributeName={"Procurement type "} inputContain={["Instock","Express","Domestic Procurement","Made To Order"]} />
        <InputBox headName={""} attributeName={"Procurement SLA"} inputContain={"DAY"}/>
        <InputBox headName={""} attributeName={"Stock"} inputContain={""}/>
  
        <SelectBox headName={""} attributeName={"Shipping provider"} inputContain={["FlipKart"]} />

        <InputBox headName={"Delivery charge to customer"} attributeName={"Local delivery charge "} inputContain={"INR"}/>
        <InputBox headName={""} attributeName={"Zonal delivery charge "} inputContain={"INR"}/>
        <InputBox headName={""} attributeName={"National delivery charge "} inputContain={"INR"}/>

        <InputBox headName={"Package details"} attributeName={"Length"} inputContain={"CM"}/>
        <InputBox headName={""} attributeName={"Breadth "} inputContain={"CM"}/>
        <InputBox headName={""} attributeName={"Height"} inputContain={"CM"}/>
        <InputBox headName={""} attributeName={"Weight "} inputContain={"CM"}/>

        <InputBox headName={"Tax details"} attributeName={"HSN  "} inputContain={""}/>
        <SelectBox headName={""} attributeName={"Tax Code"} inputContain={["GST_0","GST_12","GST_18","GST_28","GST_3","GST_5","GST_APPAREL"]} />

        <SelectBox headName={"Manufacturing Details"} attributeName={"Country Of Origin "} inputContain={["GST_0","GST_12","GST_18","GST_28","GST_3","GST_5","GST_APPAREL"]} />
        <InputBox headName={""} attributeName={"Manufacturer Details "} inputContain={""}/>
        <InputBox headName={""} attributeName={"Packer Details "} inputContain={""}/>


        </div>
  )
}

export default DisplayInputContainer