import React, { useState } from 'react'
import styles from './Navbar.module.css'
import { FaRegUser, FaSearch } from 'react-icons/fa'
import { FiHeart } from 'react-icons/fi'
import { BsCart4, BsShop } from 'react-icons/bs'
import HoverDown from './components/hoverDown/HoverDown'
import { Link, useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { togglePageControlInUser } from '../../../redux/toogleSlice'

const Navbar: React.FC = () => {

  const [handledownoption, sethandledownoption] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const gotoWishlist = () => {
    dispatch(togglePageControlInUser("My Wishlist"));
    navigate("/User/MyAccount");
  }

  return (
    <div className={styles.body}>
      <div className={styles.sections}>
        <div className={styles.webName}>Buyway</div>
      </div>
      <div className={styles.sections}>
        <div className={styles.searchBar}>
          <input type="text" placeholder='search for products,brand and more' />
          <div className={styles.searchIcon}>
            <FaSearch />
          </div>
        </div>
      </div>
      <div className={styles.sections}>
        <div className={styles.loginReg}
          onMouseEnter={() => {
            sethandledownoption(!handledownoption);
          }}
          onMouseLeave={() => {
            sethandledownoption(!handledownoption)
          }}>
          <div className={styles.logcon}>
            <span className={styles.navIcons}><FaRegUser /></span>
            <span className={styles.flex}>
              <div className={styles.log}>Log In</div>
              <div className={styles.reg}>My Account</div>
            </span >
          </div>

          {handledownoption && (
            <div className={styles.newlistDropdown}>
              <HoverDown />
            </div>
          )}

        </div>
        <div className={styles.wishList}>
          <span className={styles.navIcons}><FiHeart /></span>
          <span className={styles.whilistName} onClick={gotoWishlist}>Wishlist</span>
        </div>
        <div className={styles.cart}>
        <Link to={"/User/Cart"} style={{textDecoration:"none", color:"inherit"}}>
          <span className={styles.navIcons}><BsCart4 /></span>
          Cart </Link></div>
        <>
          <Link to={"/SellerLanding"} className={styles.becomeSeller}>
            <span className={styles.navIcons}><BsShop /></span>
            Become a Seller
          </Link>
        </>
      </div>
    </div>
  )
}

export default Navbar