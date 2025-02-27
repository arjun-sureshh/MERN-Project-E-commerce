import React, { useEffect, useState } from 'react'
import styles from './AddInput.module.css'
import InputField from './components/InputField/InputField'
import { GoPlus } from "react-icons/go";
import { FiMinus } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/store';
import { removeFeatureField, toggleFeatureAdd } from '../../../../../../redux/toogleSlice';

interface InputProps {
    headName?: string;
    // attributeName: string;
    // inputContain?: string;
    // name: keyof RootState["toggle"]["productFields"];
}

const AddInput:React.FC<InputProps> = ({ headName}) => {
    const dispatch = useDispatch();
    const features = useSelector((state: RootState) => state.toggle.features);
    console.log(features);
    
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

   

    const addFeatureField = () => {
        dispatch(toggleFeatureAdd({ title: "", content: "" }));
    };

    const removeFeature = (index: number) => {
        dispatch(removeFeatureField(index));
    };

    useEffect(() => {
        addFeatureField();
    }, [])
    

  return (
 <div className={styles.container}>
    {headName && <div className={styles.headName}>{headName}</div>}
    {features.map((feature,index) =>(
    <div className={styles.subContainer}>
    <div className={styles.inputField}>
       <InputField index={index}/>
    </div>
    <div
        className={styles.plusBtn}
        onClick={index === features.length - 1 ? addFeatureField : () => removeFeature(index)}
      >
        {index === features.length - 1 ? <GoPlus /> : <FiMinus/>}
      </div>
    </div>
    )) }
 </div>
  )
}

export default AddInput