import React from 'react'
import styles from './CustomInput.module.css'
import { TextField } from '@mui/material'

interface CustomInputProps{
    label:string;
    placeholder:string;
}

const CustomInput:React.FC<CustomInputProps> = ({label,placeholder}) => {
  return (
    <div className={styles.body}>
        <TextField
          id="outlined-textarea"
          label={label}
          placeholder={placeholder}
          
        />
    </div>
  )
}

export default CustomInput