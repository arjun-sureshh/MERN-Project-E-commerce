import React, { useEffect, useState } from 'react'
import styles from './AddNewProductToListing.module.css'
import SubNav from '../mylisting/components/subNav/SubNav'
import ProductAddingSections from './components/productAddingSection/ProductAddingSections'
import ProductPhoto from './components/productPhoto/ProductPhoto'
import PriceAndStock from './components/price,Stock,Shiping/PriceAndStock'
import ProductDescription from './components/productDescription/ProductDescription'
import AdditionalDescription from './components/additionalDescription/AdditionalDescription'
import AddPhoto from './components/productPhoto/components/AddPhoto'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import SelectCategory from './components/selectCategory/SelectCategory'
import SelectBrand from './components/selectBrand/SelectBrand'

const AddNewProductToListing: React.FC = () => {

  const [displayphotoupload, setdisplayPhotoupload] = useState<Boolean>(false)
  const productAdddingState = useSelector((state: RootState) => state.toggle.productAdddingState)


  const displayimageBlock = () => {
    setdisplayPhotoupload(!displayphotoupload)
  }
 
  
  

  return (
    <div className={styles.body}>
      <div className={styles.suNav}>
        <SubNav addnewlisting={true} subnavName={"Add a Single Listing"} path={"/Seller/AddNewProductToListing"} />
      </div>
      <div className={styles.productaddingnav}>
        <ProductAddingSections />
      </div>
      <div className={styles.productAddingContainer}>

        {productAdddingState === 1 && <SelectCategory />}
        {productAdddingState === 2 && <SelectBrand/>}

        {productAdddingState === 3 &&
          <><div className={styles.photoSection}>

            {displayphotoupload ?
              <AddPhoto displyaimageblockFn={displayimageBlock} />
              :
              <ProductPhoto displyaimageblockFn={displayimageBlock} />}
          </div><div className={styles.detailsSection}>


              <PriceAndStock />

              <ProductDescription />
              <AdditionalDescription />
            </div></>
        }
      </div>
    </div>
  )
}

export default AddNewProductToListing