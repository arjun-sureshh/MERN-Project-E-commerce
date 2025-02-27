import React from 'react'
import styles from './DisplayContainer.module.css'
import InputBox from '../../../components/inputbox/InputBox'
import SelectBox from '../../../components/selectBox/SelectBox'
import { RootState } from '../../../../../../../redux/store';

type DisplayInputContainerProps = {
  inputRefs: Record<
  keyof RootState["toggle"]["productFields"],
  React.RefObject<HTMLInputElement>
>;
};

const DisplayContainer:React.FC<DisplayInputContainerProps> = ({inputRefs}) => {
  return (
    <div className={styles.inputwholeContainer}>
        <InputBox headName={"Product Details"}   attributeName={"Product Title"} ref={inputRefs["productTitle"]} name={'productTitle'} inputContain={""}/>
        <InputBox headName={""} attributeName={"Product Discription"} ref={inputRefs["productDiscription"]} name={"productDiscription"} inputContain={""}/>
        <InputBox headName={""} attributeName={"In The Box"} ref={inputRefs["intheBox"]} name={"intheBox"} inputContain={""}/>
        <InputBox headName={""} attributeName={"Minimum OrderQty"} ref={inputRefs["minimumOrderQty"]} name={"minimumOrderQty"} inputContain={""}/>


        
        <SelectBox headName={"Manufacturing Details"} attributeName={"Country Of Origin "} name={"countryOfOrigin"} inputContain={["GST_0","GST_12","GST_18","GST_28","GST_3","GST_5","GST_APPAREL"]} />
        <InputBox headName={""} attributeName={"Manufacturer Details"} ref={inputRefs["manufacturerDetails"]} name={"manufacturerDetails"} inputContain={""}/>
        <InputBox headName={""} attributeName={"Packer Details"} ref={inputRefs["packerDetails"]} name={"packerDetails"} inputContain={""} />
        </div>
  )
}

export default DisplayContainer