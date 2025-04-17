import React from 'react';
import styles from './SingleProduct.module.css';
import defaultImg from '../../../../../assets/iphone-black.jpg';
import { Product } from '../../../types';
import { useNavigate } from 'react-router';

interface SingleProductProps {
  product: Product;
}

const SingleProduct: React.FC<SingleProductProps> = ({ product }) => {
  const baseURL = 'http://localhost:5000';
    const navigate = useNavigate();
  
    const handleNavigate = () =>{
      sessionStorage.setItem("clickedproductId",product.productId);
      navigate("/User/ProductView");
    }
  return (
    <div className={styles.body} onClick={handleNavigate}>
      <div className={styles.imgSec}>
        <img src={product.image ? `${baseURL}${product.image}` : defaultImg} alt={product.productTitle} />
      </div>
      <div className={styles.nameSec}>
        <div className={styles.productName}>{product.productTitle}</div>
        <div className={styles.highlightword}>From ₹{product.sellingPrice.toLocaleString()}</div>
      </div>
    </div>
  );
};

export default SingleProduct;