import styles from './CartProduct.module.css';
import {  useNavigate } from 'react-router';
import axios from 'axios';
import { existingUserData } from '../../../../components/types/types';

interface CartProductProps {
  cartItem?: {
    cart_Id?:string;
    productvariantId?: string;
    mrp?: number;
    sellingPrice?: number;
    sellerName?: string;
    image?: string;
    specification?: string;
    createdAt?: string;
    updatedAt?: string;
    bookingAmount?:number;
    productTitle?:string;
    productId?:string
  };
  existingUserData?:existingUserData | null;
  setIschanged:React.Dispatch<React.SetStateAction<boolean>>;
}

const CartProduct: React.FC<CartProductProps> = ({ cartItem , existingUserData, setIschanged  }) => {

  const baseURL = 'http://localhost:5000';
const navigate = useNavigate();
// handle navigate
  const handleNavigate = () =>{
    if (cartItem && cartItem.productId) {
      
      sessionStorage.setItem("clickedproductId", cartItem.productId);
      navigate('/User/ProductView')
    }
  };

  //handle remove the cart
  const handleRemove = async () => {
    if (!existingUserData?._id) {
      console.log('No user logged in, redirecting to login');
      navigate('/User/Login');
      return;
    }
    if (!cartItem?.cart_Id) {
      console.error('No cart item selected for deletion');
      alert('No cart item selected');
      return;
    }
  
    try {
      const response = await axios.delete('http://localhost:5000/api/cart', {
        data: { cartId: cartItem.cart_Id, userId: existingUserData._id },
      });
  
      if (response.data.success) {
        // Update UI or state
        setIschanged((prev: boolean) =>!prev)
      } else {
        console.error('Failed to remove cart item:', response.data.message);
        alert(response.data.message || 'Failed to remove item');
      }
    } catch (error: any) {
      console.error('Error removing cart item:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Failed to remove item');
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.imageSection}>
        <div className={styles.productImage}>
          <img src={cartItem?.image ? `${baseURL}${cartItem.image}` : undefined} alt="product image" />
        </div>
      </div>
      <div className={styles.NameSection} >
        <div className={styles.name} onClick={handleNavigate}>
          {cartItem?.productTitle}{cartItem?.specification}
        </div>
        <div className={styles.sellerName}>Seller: {cartItem?.sellerName || 'XONIGHT E-Commerce'}</div>
        <div className={styles.removefromcart} onClick={handleRemove}>Remove</div>
      </div>
      <div className={styles.priceSection}>
        <div className={styles.sellingPrice}>
          ₹{cartItem?.sellingPrice?.toFixed(2) || '19,998.00'}
        </div>
        <div className={styles.MRP}>
          M.R.P: <span className={styles.strick}>₹{cartItem?.mrp?.toFixed(2) || '999.00'}</span>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;