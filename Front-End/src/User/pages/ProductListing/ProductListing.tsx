// import NavBar from '../../components/NavBar/NavBar'
import ListingProduct from './components/listing/ListingProduct'
import SideBar from './components/sideBar/SideBar'
import styles from './ProductListing.module.css'

const ProductListing = () => {
   return (
    <div className={styles.body}>
     <div className={styles.contentBody}>
      <div className={styles.sidBar}>
      <SideBar/>
      </div>
      <div className={styles.listing}>
        <ListingProduct/>
      </div>
     </div>
    </div>
  )
}

export default ProductListing