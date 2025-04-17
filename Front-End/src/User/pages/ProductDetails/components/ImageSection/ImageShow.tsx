import React, { useState, useEffect } from 'react';
import styles from './ImageShow.module.css';
import { FaShoppingCart } from 'react-icons/fa';
import { IoMdFlash } from 'react-icons/io';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { existingUserData, ProductVariant } from '../../../../components/types/types';
import axios from 'axios';
import { useNavigate } from 'react-router';

interface ImageShowProps {
  variants: ProductVariant[];
  selectedVariant?: ProductVariant;
  setSelectedVariant?: React.Dispatch<React.SetStateAction<ProductVariant | undefined>>;
  existingUserData?: existingUserData;
}

const ImageShow: React.FC<ImageShowProps> = ({ variants, selectedVariant, existingUserData }) => {
  const baseURL = 'http://localhost:5000';

  // Get images for the selected variant only
  const images = selectedVariant?.images.map((img) => ({
    src: `${baseURL}${img}`,
    alt: `${selectedVariant.productTitle} - ${selectedVariant.colorName || 'Image'}`,
  })) || [];

  // State to track the selected main image, wishlist status, and loading
  const [selectedImage, setSelectedImage] = useState<string>(images[0]?.src || '');
  const [hoverImage, setHoverImage] = useState<string | null>(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Update selectedImage when selectedVariant changes
  useEffect(() => {
    if (images.length > 0) {
      setSelectedImage(images[0].src);
    }
  }, [selectedVariant, images]);

  // Fetch wishlist status on load
  useEffect(() => {
    const checkWishlistStatus = async () => {
      if (!existingUserData?._id || !selectedVariant?.variantId) {
        setIsInWishlist(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/wishlist/status', {
          params: { userId: existingUserData._id, varientId: selectedVariant.variantId },
        });
        setIsInWishlist(response.data.isInWishlist || false);
      } catch (error: any) {
        console.error('Error fetching wishlist status:', error.response?.data || error.message);
        setIsInWishlist(false);
      }
    };

    checkWishlistStatus();
  }, [existingUserData, selectedVariant]);

  const handleThumbnailClick = (src: string, index: number) => {
    setSelectedImage(src);
  };

  const handleImageHover = (src: string) => {
    setHoverImage(src);
  };

  const handleHoverLeave = () => {
    setHoverImage(null);
  };

  const displayedImage = hoverImage || selectedImage;

  // Handler for wishlist toggle
  const handleWishlistToggle = async () => {
    if (isLoading) return;
    if (!existingUserData?._id) {
      navigate('/User/Login');
      return;
    }
    if (!selectedVariant?.variantId) {
      console.error('No variant selected');
      return;
    }
  
    setIsLoading(true);
    try {
      if(isInWishlist){
        const payload = { varientId: selectedVariant.variantId, userId: existingUserData._id };
      const response = await axios.delete('http://localhost:5000/api/wishlist', { data: payload });
      if (response.data.success) {
        setIsInWishlist(!isInWishlist);
      } else {
        console.error('Wishlist toggle failed:', response.data.message);
      }
      }else{
      const payload = { varientId: selectedVariant.variantId, userId: existingUserData._id };
      const response = await axios.post('http://localhost:5000/api/wishlist', payload);
      
      if (response.data.success) {
        setIsInWishlist(!isInWishlist);
      } else {
        console.error('Wishlist toggle failed:', response.data.message);
      }
    }
    } catch (error:any) {
      console.error('Wishlist toggle error:', error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Add to cart
  const handleAddToCart = async () => {
    if (!existingUserData?._id) {
      console.log('No user logged in, redirecting to login');
      return navigate('/User/Login');
    }
    if (!selectedVariant?.variantId) {
      console.error('No variant selected');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5000/api/cart', {
        cartQty: 1,
        variantId: selectedVariant.variantId,
        userId: existingUserData._id, // Ensure this is a valid ObjectId
      });
      console.log('Cart response:', response.data);
  
      if (response.status === 201) {
        navigate("/User/Cart");
      } else if (response.status === 400 && response.data.message === 'This product variant is already in your cart') {
        navigate("/User/Cart");
      }
    } catch (error: any) {
      console.error('Error adding to cart:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Failed to add to cart');
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.imageSection}>
        <div className={styles.sideMultiImages}>
          {images.map((image, index) => (
            <div
              key={index}
              className={`${styles.sideImage} ${image.src === selectedImage ? styles.selectedImage : ''}`}
              onClick={() => handleThumbnailClick(image.src, index)}
              onMouseEnter={() => handleImageHover(image.src)}
              onMouseLeave={handleHoverLeave}
            >
              <img src={image.src} alt={image.alt} />
            </div>
          ))}
        </div>
        <div className={styles.mainImage}>
          {displayedImage ? (
            <img src={displayedImage} alt="main product" />
          ) : (
            <div className={styles.noImage}>No image available</div>
          )}
          <button
            className={`${styles.wishlistButton} ${isInWishlist ? styles.wishlistActive : ''}`}
            onClick={handleWishlistToggle}
            disabled={isLoading}
          >
            <FavoriteIcon style={{ fontSize: '20px', color: isInWishlist ? 'red' : 'grey' }} />
          </button>
        </div>
      </div>
      <div className={styles.buySection}>
        <div className={`${styles.Button} ${styles.yellowishOrange}`} onClick={handleAddToCart}>
          <FaShoppingCart /> Go to Cart
        </div>
        <div className={`${styles.Button} ${styles.Orange}`}>
          <IoMdFlash /> Buy Now
        </div>
      </div>
    </div>
  );
};

export default ImageShow;