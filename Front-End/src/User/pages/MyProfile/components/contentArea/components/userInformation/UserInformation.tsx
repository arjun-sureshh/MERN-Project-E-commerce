import React, { useState } from 'react'
import styles from './UserInformation.module.css'
import { Button, TextField } from '@mui/material'

interface handleEditboolean {
  personalInfo: boolean;
  gender: boolean,
  address: boolean,
  mobile: boolean,
  [key: string]: boolean;
}

const UserInformation: React.FC = () => {


  const [handleEdit, setHandleEdit] = useState<handleEditboolean>({
    personalInfo: false,
    gender: false,
    address: false,
    mobile: false,
  })
  const handlechange = (name:string) =>{
    setHandleEdit({
      ...handleEdit,
      [name]: !handleEdit[name],
    })
  }

  return (
    <div className={styles.body}>
      <div className={styles.headNameSection}>
        <div className={`${styles.headName} ${!handleEdit.personalInfo && styles.disabled}`} >Personal Information</div>
        <div className={styles.editBtn}  onClick={ () =>handlechange("personalInfo")} > {handleEdit.personalInfo ? "Cancel" : "Edit"}</div>
      </div>
      <div className={styles.inputBoxSection}>
        <div className={`${styles.inputBox} `} >
          <TextField
            id="outlined-textarea"
            label="First Name"
            placeholder="first name"
            multiline
            disabled={!handleEdit.personalInfo}
            sx={{
              "& .MuiInputBase-root.Mui-disabled": {
                cursor: "not-allowed", // Apply cursor style when disabled
              },
              "& textarea.Mui-disabled": {
                cursor: "not-allowed", // Apply cursor style specifically to textarea
              },
            }}
          />
        </div>
        <div className={styles.inputBox}>
          <TextField
            id="outlined-textarea"
            label="Last Name"
            placeholder="last Name"
            multiline
            disabled={!handleEdit.personalInfo}
            sx={{
              "& .MuiInputBase-root.Mui-disabled": {
                cursor: "not-allowed", // Apply cursor style when disabled
              },
              "& textarea.Mui-disabled": {
                cursor: "not-allowed", // Apply cursor style specifically to textarea
              },
            }}
          />
        </div>
        <div className={styles.inputBox}>
          { handleEdit.personalInfo && <Button variant="contained" color="success">
            Save
          </Button>}
        </div>
      </div>

      <div className={styles.headNameSection}>
        <div className={`${styles.headName}  ${!handleEdit.personalInfo && styles.disabled}`}>Your Gender</div>
        {/* <div className={styles.editBtn} onClick={ () =>handlechange("gender")}> {handleEdit.gender ? "Edit" : "Save"}</div> */}
      </div>

      <div className={styles.inputBoxSection}>
        <div className={`${styles.radio} `}>
          <input type="radio" name='gender' disabled={!handleEdit.personalInfo}  /><p>Male</p>
        </div>
        <div className={styles.radio}>
          <input type="radio" name='gender' disabled={!handleEdit.personalInfo} className={handleEdit.personalInfo ? "" : styles.disabledTextField} /><p>Female</p>
        </div>
      </div>  


      <div className={styles.headNameSection}>
        <div className={`${styles.headName} ${!handleEdit.address && styles.disabled}`}>Email Address</div>
        <div className={styles.editBtn} onClick={ () =>handlechange("address")}> {handleEdit.address ?  "Cancel" : "Edit"}</div>
      </div>
      <div className={styles.inputBoxSection}>
        <div className={styles.inputBox}>
          <TextField
            id="outlined-textarea"
            label="Email Address"
            placeholder="email@gmail.com"
            multiline
            disabled={!handleEdit.address}
            sx={{
              "& .MuiInputBase-root.Mui-disabled": {
                cursor: "not-allowed", // Apply cursor style when disabled
              },
              "& textarea.Mui-disabled": {
                cursor: "not-allowed", // Apply cursor style specifically to textarea
              },
            }}
          />
        </div>

        <div className={styles.inputBox}>
          {handleEdit.address && <Button variant="contained" color="success">
            Save
          </Button>}
        </div>
      </div>


      <div className={styles.headNameSection}>
        <div className={`${styles.headName} ${!handleEdit.mobile && styles.disabled}`}>Mobile Number</div>
        <div className={styles.editBtn} onClick={ () =>handlechange("mobile")}> {handleEdit.mobile ?  "Cancel" : "Edit"}</div>
      </div>
      <div className={styles.inputBoxSection}>
        <div className={styles.inputBox}>
          <TextField
            id="outlined-textarea"
            label="Mobile Number"
            placeholder="**********"
            multiline
            disabled={!handleEdit.mobile}
            sx={{
              "& .MuiInputBase-root.Mui-disabled": {
                cursor: "not-allowed", // Apply cursor style when disabled
              },
              "& textarea.Mui-disabled": {
                cursor: "not-allowed", // Apply cursor style specifically to textarea
              },
            }}
          />
        </div>
        {handleEdit.mobile && <div className={styles.inputBox}>
          <Button variant="contained" color="success">
            Save
          </Button>
        </div>}
      </div>

    </div>


  )
}

export default UserInformation