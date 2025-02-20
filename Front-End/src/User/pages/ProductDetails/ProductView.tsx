import React from 'react';

import styles from './Productview.module.css';
import ImageShow from './components/ImageSection/ImageShow';
import ProductDetails from './components/DetailsSection/ProductDetails';


const ProductView: React.FC = () => {
  return (
    <div className={styles.body}>
    
      <div className={styles.productviewPage}>
      <div className={styles.singleProductView}>
        <div className={styles.imageSide}>
        
            <ImageShow/>
         
        </div>
        <div className={styles.detailsDisplay}>
          {/* Product details section can be added here */}
          <ProductDetails/>
        </div>
      </div>
    </div>
   
    </div>
  );
}

export default ProductView;
