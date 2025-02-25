import React from 'react'
import styles from './SellerRegThirdPage.module.css'
import { CiMobile3 } from 'react-icons/ci'
import { HiOutlineMailOpen } from 'react-icons/hi'
import { MdVerifiedUser } from 'react-icons/md'
import { TextField } from '@mui/material'


const SellerRegThirdPage: React.FC = () => {
    return (
        <div className={styles.full}>
            <div className={styles.border}>
                <div className={styles.first}>
                    <h2> Hello, Athul CV</h2>
                </div>
                <div className={styles.mobile}>Mobile & email verification</div>
                <div className={styles.phone}>
                    <div className={styles.mobicon}><CiMobile3 /></div>
                    <div className={styles.mobnum}> +919876543210</div>
                    <div className={styles.verified}>verified</div>

                </div>
                <div className={styles.phone}>
                    <div><HiOutlineMailOpen /></div>
                    <div className={styles.emailtxt}>athul123@gmail.com</div>
                    <div className={styles.resend}>Resend Email</div>
                </div>

            </div>
            <div className={styles.secmain}>
             
                <div className={styles.id}> GSTIN</div>

                <div className={styles.fnamgst}>
                    <TextField
                    id="outlined-multiline-flexible"
                    label="Enter GSTIN"
                    multiline
                    maxRows={4} sx={{ width: "100%" }}
                />
                </div>
            </div>
            <div className={styles.third}>
                <div className={styles.store}>
                    <div className={styles.storee}>Store & Pickup Details</div>

                    <div className={styles.fnam}>
                        <TextField
                        id="outlined-multiline-flexible"
                        label="Enter Your Full Name"
                        multiline
                        maxRows={4} sx={{ width: "100%" }}
                    />
                    </div>
                    <div className={styles.fnam}>
                        <TextField
                        id="outlined-multiline-flexible"
                        label="Enter Display Name"
                        multiline
                        maxRows={4} sx={{ width: "100%" }}
                    /></div>
                    <div className={styles.display}><MdVerifiedUser /> Your display name is available</div>
                    <div className={styles.fnam}>
                        <TextField
                        id="outlined-multiline-flexible"
                        label="Enter Store Description"
                        multiline
                        maxRows={4} rows={2} sx={{ width: "100%" }}
                    />
                    </div>
                    <div className={styles.fnam}>
                        <TextField
                        id="outlined-multiline-flexible"
                        label="Enter Pickup Pincode"
                        multiline
                        maxRows={1} sx={{ width: "100%" }}
                    />
                    </div>
                    
                    <div className={styles.storee}>Please enter a pincode of "IN-KL" as per your GSTIN</div>
                </div>


            </div>
            <div className={styles.third}>
                <div className={styles.store}>
                    <div className={styles.storee}>Bank Details</div>

                    <div className={styles.fnam}>
                        <TextField
                        id="outlined-multiline-flexible"
                        label="Enter Your Account No:"
                        multiline
                        maxRows={1} sx={{ width: "100%" }}
                    />
                    </div>
                    <div className={styles.fnam}>
                        <TextField
                        id="outlined-multiline-flexible"
                        label="Re-Enter Your Account No:"
                        multiline
                        maxRows={1} sx={{ width: "100%" }}
                    /></div>
                    <div className={styles.display}><MdVerifiedUser /> Your display name is available</div>
                    <div className={styles.fnam}>
                        <TextField
                        id="outlined-multiline-flexible"
                        label="Enter ifscCode"
                        multiline
                        maxRows={1}  sx={{ width: "100%" }}
                    />
                    </div>
                    <div className={styles.save}>Save</div>
                </div>
            </div>

        </div>

    )
}

export default SellerRegThirdPage