import React, {  useState } from 'react'
import styles from './Navbar.module.css'
import { FaRegUser, FaSearch } from 'react-icons/fa'
import { FiHeart } from 'react-icons/fi'
import { BsCart4, BsShop } from 'react-icons/bs'
import HoverDown from './components/hoverDown/HoverDown'

const Navbar: React.FC = () => {

  const [handledownoption, sethandledownoption] = useState<boolean>(false);
 


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
          <span className={styles.whilistName}>Wishlist</span>
        </div>
        <div className={styles.cart}>
          <span className={styles.navIcons}><BsCart4 /></span>
          Cart</div>
        <div className={styles.becomeSeller}>
          <span className={styles.navIcons}><BsShop /></span>
          Become a Seller
        </div>
      </div>
    </div>
  )
}

export default Navbar