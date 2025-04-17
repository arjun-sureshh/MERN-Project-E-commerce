import React, { useEffect, useState } from 'react';
import styles from './Productview.module.css';
import ImageShow from './components/ImageSection/ImageShow';
import ProductDetails from './components/DetailsSection/ProductDetails';
import axios from 'axios';
import { ProductVariant } from '../../components/types/types';
import { useNavigate } from 'react-router';

const ProductView: React.FC = () => {
  const singleProductId = sessionStorage.getItem('clickedproductId');
  const navigate = useNavigate();
  
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(undefined);
  const existingUser = sessionStorage.getItem('user');
 const [existingUserData, setexistingUserData] = useState();
  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!singleProductId) return;

      try {
        setLoading(true);
        const response = await axios.post(
          'http://localhost:5000/api/productvaraint/fetchVaraint-single-View',
          { productId: singleProductId }
        );
        console.log('API Response in single product:', response.data);

        const variantData: ProductVariant[] = response.data.data || [];
        setVariants(variantData);
        if (variantData.length > 0) {
          setSelectedVariant(variantData[0]);
        }
        setLoading(false);
      } catch (error: any) {
        console.error('Error fetching product variants:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    const fetchUserDetails = async () => {
      const token = existingUser;
     if(!token){
      return console.log("user not signin");
      
     }
      try {
        const response = await axios.get("http://localhost:5000/api/Login", {
          headers: {
            "x-auth-token": token, // Send token in header
          },
        });
        console.log(response,"logeduser");
        // navigate("/User/");
  
        setexistingUserData(response.data); // Set seller details in state
      } catch (error) {
        console.error("Error fetching seller details:", error);
        // navigate("/SellerLanding"); // Redirect to login on error
      }
    };
  

    fetchUserDetails();

    fetchProductDetails();
  }, [singleProductId,navigate]);


  if (loading) {
    return (
      <div className={styles.body}>
        <div className={styles.productviewPage}>
          <div className={styles.singleProductView}>
            <div className={styles.imageSide}>Loading images...</div>
            <div className={styles.detailsDisplay}>Loading details...</div>
          </div>
        </div>
      </div>
    );
  }
  if (error) return <div className={styles.body}>Error: {error}</div>;
  if (variants.length === 0) return <div className={styles.body}>No variants found.</div>;

  return (
    <div className={styles.body}>
      <div className={styles.productviewPage}>
        <div className={styles.singleProductView}>
          <div className={styles.imageSide}>
            <ImageShow
              variants={variants}
              selectedVariant={selectedVariant}
              setSelectedVariant={setSelectedVariant}
              existingUserData={existingUserData}
            />
          </div>
          <div className={styles.detailsDisplay}>
            {selectedVariant && (
              <ProductDetails
                variants={variants}
                selectedVariant={selectedVariant}
                setSelectedVariant={setSelectedVariant}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;