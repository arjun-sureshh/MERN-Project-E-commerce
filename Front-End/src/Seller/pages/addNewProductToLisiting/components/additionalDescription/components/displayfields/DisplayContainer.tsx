import React from 'react'
import styles from './DisplayContainer.module.css'
import InputBox from '../../../components/inputbox/InputBox'
import { RootState } from '../../../../../../../redux/store';
import AddInput from '../../../components/addInput/AddInput';
import SearchKeywordManager from '../../../components/addsearchInput/AddSearchInput';

type DisplayInputContainerProps = {
  inputRefs: Record<
  keyof RootState["toggle"]["productFields"],
  React.RefObject<HTMLInputElement>
>;
};

const DisplayContainer:React.FC<DisplayInputContainerProps> = ({inputRefs}) => {
  return (
    <div className={styles.inputwholeContainer}>
        <InputBox headName={"Warranty Details"}   attributeName={"Warranty Period"} ref={inputRefs["warrantyPeriod"]} name={'warrantyPeriod'} inputContain={""} required={""}/>
        <InputBox headName={""} attributeName={"Waranty Summary"} ref={inputRefs["warantySummary"]} name={"warantySummary"} inputContain={"INR"} required={""}/>
        <AddInput headName={"Key Features"} />
        <SearchKeywordManager headName={"Key Words"}   attributeName={"Search Key Words"} required={""}/>
        </div>
  )
}

export default DisplayContainer