import React, { useEffect, useState } from 'react';
import styles from './Cart.module.css';
import CartProduct from './components/cartproduct/CartProduct';
import CartTotalPrice from './components/cartTotalprice/CartTotalPrice';
import axios from 'axios';
import { existingUserData } from '../../components/types/types';

const Cart: React.FC = () => {
  const [existingUserData, setExistingUserData] = useState<existingUserData | null>(null);
  const [cartItems, setCartItems] = useState<any[]>([]); // Adjust type based on backend response
const [ischanged, setIschanged] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = sessionStorage.getItem('user');
      if (!token) {
        console.log('No user signed in');
        setExistingUserData(null);
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/Login', {
          headers: { 'x-auth-token': token },
        });
        console.log('Logged user response:', response.data);
        setExistingUserData(response.data);
      } catch (error: any) {
        console.error('Error fetching user details:', {
          message: error.message,
          response: error.response?.data,
        });
        setExistingUserData(null);
        sessionStorage.removeItem('user');
      }
    };

    fetchUserDetails();
  }, []);

  useEffect(() => {
    const fetchYourCart = async () => {
      if (!existingUserData?._id) return;

      try {
        const response = await axios.get(`http://localhost:5000/api/cart/${existingUserData._id}`);
        console.log('Cart response:', response.data);
        if (response.data.success) {
          setCartItems(response.data.data || []);
        }
      } catch (error: any) {
        console.error('Error fetching cart details:', error.response?.data || error.message);
      }
    };

    fetchYourCart(); // Call the function
  }, [existingUserData,ischanged]);

  return (
    <div className={styles.body}>
      <div>
        <div className={styles.product}>
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => <CartProduct setIschanged={setIschanged} existingUserData={existingUserData} key={index} cartItem={item} />)
          ) : (
            <div className={styles.noItems}>Your cart is empty</div>
          )}
        </div>
        <div className={styles.placeOrderSection}>
          <button className={styles.placeOrderButton} disabled={cartItems.length === 0}>
            Place Order
          </button>
        </div>
      </div>
      <div className={styles.totalPrice}>
        <CartTotalPrice cartItems={cartItems} />
      </div>
    </div>
  );
};

export default Cart;