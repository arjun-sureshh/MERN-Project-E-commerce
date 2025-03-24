import { FaAngleDown, FaSearch } from 'react-icons/fa'
import styles from './MainBar.module.css'
import { FaCartShopping } from 'react-icons/fa6'
import explorPlus from '../../../../../assets/explorePlus.png' 
import { Link } from 'react-router'


const MainBar = () => {
  return (
    <div>
          <div className={styles.flipSearchBar}>
        <div className={styles.wholeBar}>
          <div className={styles.flipkart}>
            <div className={styles.kartName}>
              <div className={styles.name1}><Link style={{textDecoration:"none", color:"inherit"}} to={"/"}> BeeStore </Link></div>
              {/* <div className={styles.name2}>Explore <span>Plus <img src={explorPlus} alt="plus" /></span></div> */}
            </div>
          </div>
          <div className={styles.searchBar}>
            <input type="text" placeholder='search for products,brand and more' />
            <div className={styles.searchIcon}>
            <FaSearch/>
            </div>
          </div>
          <div className={styles.login}>Login</div>
          <div className={styles.becomeSeller}><Link style={{textDecoration:"none", color:"inherit"}} to={"/SellerLanding"}>becomeSeller</Link></div>
          <div className={styles.moreOption}>more<FaAngleDown /></div>
          <div className={styles.cart}><FaCartShopping/>Cart</div>
        </div>
        </div>  
    </div>
  )
}

export default MainBar