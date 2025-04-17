import React, { useState } from "react";
import styles from './ProductShow.module.css';
import { FaStar } from "react-icons/fa";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from "react-router";

interface ProductShowProps {
  productId: string;
  productTitle: string;
  sellingPrice: number;
  mrp: number;
  image: string;
  brandName?: string;
  sellerName?: string;
  productColor?: string;
}

const ProductShow: React.FC<ProductShowProps> = ({
  productId,
  productTitle,
  sellingPrice,
  mrp,
  image,
  brandName,
  sellerName,
  productColor,
}) => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState<boolean>(false);
  const discountPercentage = mrp > 0 && sellingPrice <= mrp
    ? Math.round(((mrp - sellingPrice) / mrp) * 100)
    : 0;
  const baseURL = "http://localhost:5000";

  const handleNavigate = () =>{
    sessionStorage.setItem("clickedproductId",productId);
    // dispatch(toggleSingleProductId(productId));
    navigate("/User/ProductView");
  }

  return (
    <div className={styles.card} >
      <div className={styles.imageSection}>
        <img src={`${baseURL}${image}`} alt={productTitle} className={styles.productImage} />
        <div
          className={`${styles.wishlist} ${wishlist ? styles.wishlistActive : styles.wishlistInactive}`}
          onClick={() => setWishlist(!wishlist)}
        >
          <FavoriteIcon style={{ fontSize: '20px' }} />
        </div>
      </div>
      <div className={styles.details} onClick={handleNavigate}>
        <h3 className={styles.title}>{brandName ? `${brandName} ${productTitle}` : productTitle}</h3>
        <div className={styles.rating}>
          <span className={styles.avgRating}>4.6 <FaStar /></span>
          <span className={styles.ratingCount}>(2,27,620 Ratings & 8,136 Reviews)</span>
        </div>
        <div className={styles.priceRow}>
          <span className={styles.sellingPrice}>₹{sellingPrice.toLocaleString()}</span>
          {discountPercentage > 0 && (
            <>
              <span className={styles.mrp}>₹{mrp.toLocaleString()}</span>
              <span className={styles.discount}>{discountPercentage}% off</span>
            </>
          )}
        </div>
        {productColor && (
          <div className={styles.color}>
            <span>Color: </span>
            <span className={styles.colorSwatch} style={{ backgroundColor: productColor }}></span>
            <span>{productColor}</span>
          </div>
        )}
        {sellerName && <div className={styles.seller}>Seller: {sellerName}</div>}
      </div>
    </div>
  );
};

export default ProductShow;