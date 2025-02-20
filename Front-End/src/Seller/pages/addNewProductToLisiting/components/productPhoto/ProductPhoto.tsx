import React from 'react'
import styles from './ProductPhoto.module.css'
import { LuImagePlus } from 'react-icons/lu'
import { IoCheckmarkCircle } from 'react-icons/io5'

interface ProductPhotoProps{
  displyaimageblockFn: () => void;
}

const ProductPhoto: React.FC<ProductPhotoProps> = ({displyaimageblockFn}) => {
  return (
    <div className={styles.body}>
      <div className={styles.titleSection}>
        <div className={styles.flex}>
          <div className={styles.icons}><IoCheckmarkCircle /></div>
          <div className={styles.title}> Product Photos (0/3)</div>
        </div>

        <div className={styles.Editbtn} onClick={displyaimageblockFn}>Edit</div>
      </div>
      <div className={styles.ImageSection}>
        <span className={styles.icon} onClick={displyaimageblockFn}><LuImagePlus /></span>
      </div>
    </div>
  )
}

export default ProductPhoto