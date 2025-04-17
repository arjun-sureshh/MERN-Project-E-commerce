import React from 'react';
import styles from './BestProductLIst.module.css';
import SingleProduct from './components/singleProduct/SingleProduct';
import { IoArrowForwardCircleSharp } from 'react-icons/io5';
import { Product } from '../types';
import { useNavigate } from 'react-router-dom';

interface BestProductLIstProps {
  title: string;
  products: Product[];
  topcategoryId: string;
}

const BestProductLIst: React.FC<BestProductLIstProps> = ({ title, products, topcategoryId }) => {
  const navigate = useNavigate();

  const navigateToProductListing = () => {
    sessionStorage.setItem('clickedCategoryId', topcategoryId);
    navigate('/User/ProductListing');
  };

  return (
    <div className={styles.body}>
      <div className={styles.title}>
        {title}{' '}
        <span className={styles.icon} onClick={navigateToProductListing}>
          <IoArrowForwardCircleSharp />
        </span>
      </div>
      <div className={styles.productsRow}>
        {products.map((product) => (
          <SingleProduct key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default BestProductLIst;