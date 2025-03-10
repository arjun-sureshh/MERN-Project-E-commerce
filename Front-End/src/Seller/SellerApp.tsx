import React from 'react'
import styles from './SellerApp.module.css'
import { Link } from 'react-router'

const SellerApp:React.FC = () => {
  return (
<div className={styles.container}>
      {/* Navigation Bar */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>SELLER HUB</div>
        <ul className={styles.navLinks}>
          <li>Home</li>
          <li>About</li>
          <li>Pricing</li>
          <li>Contact</li>
          <li>
            <button className={styles.sellerButton}>Seller Login</button>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Sell Your Products with Ease</h1>
          <p>Join thousands of sellers growing their business on our platform.</p>
          <Link to={"/Seller/Registration"}><button className={styles.registerButton}> Start Selling</button></Link>
        </div>
      </section>
    </div>
  )
}

export default SellerApp