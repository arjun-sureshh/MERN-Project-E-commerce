import React from 'react'
import styles from './NewAddress.module.css'
import CustomInput from './components/customInput/CustomInput'
import { MdMyLocation } from 'react-icons/md'
import { Button, TextField } from '@mui/material'
import MultipleSelectPlaceholder from './components/textArea/dropDown'

interface NewAddressProps{
    updateNewAddress: () => void; // Function type as a prop
   
}

const NewAddress: React.FC<NewAddressProps> = ({updateNewAddress}) => {
    return (
        <div className={styles.body}>
            <div className={styles.headMsg}>ADD A NEW ADDRESS</div>
            <div className={styles.currectLocationBtn}>
                <div className={styles.icon}><MdMyLocation /></div>
                <div className={styles.locationMsg}>Use my current location</div>
            </div>
            <div className={styles.inputrawSection}>
                <CustomInput label={"Full Name"} placeholder={"full name"} />
                <CustomInput label={"Mobile"} placeholder={"10-digits mobile number"} />
            </div>
            <div className={styles.inputrawSection}>
                <CustomInput label={"Pincode"} placeholder={"pincode"} />
                <CustomInput label={"Locality"} placeholder={"locality"} />
            </div>
            <div className={styles.textarea}>
                <TextField
                    id="outlined-multiline-static"
                    label="Address"
                    multiline
                    minRows={3}
                    sx={{ width: 455}}
                    placeholder='Address(Area and Street)'
                />
            </div>
            <div className={styles.inputrawSection}>
                <CustomInput label={"City/District/Town"} placeholder={"City/District/Town"} />
               <MultipleSelectPlaceholder/>
            </div>
            <div className={styles.inputrawSection}>
                <CustomInput label={"LandMark"} placeholder={"LandMark(optional)"} />
                <CustomInput label={"Alternate Phone"} placeholder={"Alternate Phone(Optional)"} />
            </div>
            <div className={styles.addressType}>
                <div className={styles.addressTypeName}>Address Type</div>
                <div className={styles.inputBoxSection}>
                    <div className={`${styles.radio} `}>
                        <input type="radio" name='addressType' /><p>Home</p>
                    </div>
                    <div className={styles.radio}>
                        <input type="radio" name='addressType' /><p>Work</p>
                    </div>
                </div>
            </div>
            <div className={styles.saveCancel}>
                <Button variant="contained" size="large">
                    Save
                </Button>
                <div className={styles.btnCancel} onClick={updateNewAddress}>

                <Button variant="text" size='medium'  >Cancel</Button>
                </div>
            </div>
        </div>
    )
}

export default NewAddress