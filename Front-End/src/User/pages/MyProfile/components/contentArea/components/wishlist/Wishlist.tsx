import React, { useState, useEffect } from 'react';
import styles from './Wishlist.module.css';
import WishlistProducts from './components/whishlistProducts/WishlistProducts';
import axios from 'axios';
import { existingUserData } from '../../../../../../components/types/types';

interface WishlistItem {
  varientId: string;
  productName: string;
  image: string;
  sellingPrice: string;
  MRP: string;
  offerPer: string;
  productRating: string;
  totalOrders: string;
}

const Wishlist: React.FC = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null); // Track deleting item
  const [existingUserData, setExistingUserData] = useState<existingUserData | null>(null);

  // Fetch user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = sessionStorage.getItem('user');
      if (!token) {
        console.log('No user signed in');
        setExistingUserData(null);
        setWishlistItems([]);
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/Login', {
          headers: {
            'x-auth-token': token,
          },
        });
        console.log('Logged user response:', response.data);
        setExistingUserData(response.data);
      } catch (error: any) {
        console.error('Error fetching user details:', {
          message: error.message,
          response: error.response?.data,
        });
        setExistingUserData(null);
        setWishlistItems([]);
        sessionStorage.removeItem('user');
      }
    };

    fetchUserDetails();
  }, []);

  // Fetch wishlist
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!existingUserData?._id) {
        console.log('No user logged in, skipping wishlist fetch');
        setWishlistItems([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/wishlist', {
          params: { userId: existingUserData._id },
        });
        console.log('Wishlist fetch response:', response.data);
        setWishlistItems(response.data);
      } catch (error: any) {
        console.error('Error fetching wishlist:', {
          message: error.message,
          response: error.response?.data,
        });
        setWishlistItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlist();
  }, [existingUserData]);

  // Delete from wishlist
  const deleteFromWishlist = async (productvaraintId: string) => {
    if (!existingUserData?._id) {
      console.log('No user logged in, cannot delete');
      return;
    }

    if (isDeleting) {
      console.log('Deletion in progress, please wait');
      return;
    }

    setIsDeleting(productvaraintId);
    try {
      const payload = {
        varientId: productvaraintId, // Matches backend
        userId: existingUserData._id,
      };
      console.log('Wishlist delete payload:', payload);

      const response = await axios.delete('http://localhost:5000/api/wishlist', { data: payload });
      console.log('Wishlist delete response:', response.data);

      if (response.data.success) {
        // Optimistically update state
        setWishlistItems((prev) => prev.filter((item) => item.varientId !== productvaraintId));
        console.log(`Removed variant ${productvaraintId} from wishlist`);
      } else {
        console.error('Failed to delete from wishlist:', response.data.message);
      }
    } catch (error: any) {
      console.error('Wishlist delete error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      // Optionally refetch wishlist on error to ensure consistency
      // await fetchWishlist();
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.wishlistName}>
        My Wishlist <span className={styles.wishlistCount}>({wishlistItems.length})</span>
      </div>
      <div className={styles.wishlistProducts}>
        {isLoading ? (
          <div>Loading wishlist...</div>
        ) : wishlistItems.length === 0 ? (
          <div>No items in wishlist</div>
        ) : (
          wishlistItems.map((item, index) => (
            <WishlistProducts
              key={`${item.varientId}-${index}`}
              img={item.image ? `http://localhost:5000${item.image}` : '/default-image.jpg'}
              productName={item.productName || 'Unknown Product'}
              productRating={item.productRating || '0'}
              totalOrders={item.totalOrders || '0'}
              sellingPrice={item.sellingPrice || '0'}
              MRP={item.MRP || '0'}
              offerPer={item.offerPer || '0'}
              productvaraintId={item.varientId}
              deleteFromWishlist={deleteFromWishlist}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Wishlist;