import React from 'react'
import styles from './AddPhoto.module.css'
import { IoCheckmarkCircle } from 'react-icons/io5'
import { BsFillImageFill } from 'react-icons/bs'
import { MdAddBox } from 'react-icons/md'
import { FaUpload } from 'react-icons/fa'

interface AddPhotoProps{
    displyaimageblockFn: () => void;
  }

const AddPhoto: React.FC<AddPhotoProps> = ({displyaimageblockFn}) => {
    return (
        <div className={styles.body}>
            <div className={styles.titleSection}>
                <div className={styles.flex}>
                    <div className={styles.icons}><IoCheckmarkCircle /></div>
                    <div className={styles.title}> Product Photos (0/3)</div>
                </div>
                <div className={styles.flex}>
                    <div className={styles.cancle} onClick={displyaimageblockFn}>Cancel</div>
                    <div className={styles.savebtn}>Save</div>
                </div>
            </div>
            <div className={styles.imagecards}>
                <div className={styles.imgcard}><BsFillImageFill /></div>
                <div className={styles.imgcard}><BsFillImageFill /></div>
                <div className={styles.imgcard}><BsFillImageFill /></div>
                <div className={`${styles.addNew} ${styles.imgcard}`} ><MdAddBox /></div>
            </div>
            <div className={styles.mainimgSec}>
                <div className={styles.mainimg}>
                    <BsFillImageFill />
                </div>
                <div className={styles.uploadimagebtn}>
                <FaUpload />Upload Photo
                </div>
            </div>
            {/* ...................instructions or tips.................. */}
            <div className={styles.tipContainer}>
                <div className={styles.head}><span className={styles.i}>i</span>Follow Image GuideLines to reduce the Quality Check failures</div>
                <div className={styles.tipbody}>
                    <div className={styles.subTitle}>Image Resolution</div>
                    <div className={styles.subdef}>Use clear color images with minimum resolution of 250x100 px.</div>
                    <div className={styles.subTitle}>Image Guidelines</div>
                    <div className={styles.subdef}>Upload authentic product photos taken in bright lighting</div>
                    
                </div>
            </div>
        </div>
    )
}

export default AddPhoto