import React from 'react'
import styles from './HomePage.module.css'
import Navbar from './components/navBar/Navbar'
import Banners from './components/banner/Banners'
import BestProductLIst from './components/bestProductslist/BestProductLIst'
import Footer from '../User/components/Footer/Footer'
import imss from '../assets/headset.jpg'
import imglyRemoveBackground from "@imgly/background-removal"

const HomePage: React.FC = () => {


  

  return (
    <div className={styles.body}>
      <div className={styles.navBar}>
        <Navbar />
      </div>
      <div className={styles.bannerSec}>
        <Banners />
      </div>
      <div className={styles.ProductListing}>
        <BestProductLIst />
        <BestProductLIst />
        <BestProductLIst />
        <BestProductLIst />
      </div>
      <div>
      </div>
     <div className={styles.footer}>
      <Footer/>
     </div>
    </div>
  )
}

export default HomePage