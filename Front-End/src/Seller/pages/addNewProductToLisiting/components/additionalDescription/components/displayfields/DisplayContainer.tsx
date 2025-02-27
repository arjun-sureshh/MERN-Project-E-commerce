import React from 'react'
import styles from './DisplayContainer.module.css'
import InputBox from '../../../components/inputbox/InputBox'
import SelectBox from '../../../components/selectBox/SelectBox'
import { RootState } from '../../../../../../../redux/store';
import AddInput from '../../../components/addInput/AddInput';

type DisplayInputContainerProps = {
  inputRefs: Record<
  keyof RootState["toggle"]["productFields"],
  React.RefObject<HTMLInputElement>
>;
};

const DisplayContainer:React.FC<DisplayInputContainerProps> = ({inputRefs}) => {
  return (
    <div className={styles.inputwholeContainer}>
        <InputBox headName={"Warranty Details"}   attributeName={"Warranty Period"} ref={inputRefs["warrantyPeriod"]} name={'warrantyPeriod'} inputContain={""}/>
        <InputBox headName={""} attributeName={"Waranty Summary"} ref={inputRefs["warantySummary"]} name={"warantySummary"} inputContain={"INR"}/>
        <AddInput headName={"Key Features"} />
        </div>
  )
}

export default DisplayContainer