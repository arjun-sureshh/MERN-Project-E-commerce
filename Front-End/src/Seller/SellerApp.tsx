import React, { useEffect, useState } from 'react'
import styles from './SellerApp.module.css'
import { Link, useNavigate } from 'react-router'
import SellerLogin from './pages/sellerLogin/SellerLogin'
import axios from 'axios'

const SellerApp: React.FC = () => {

  const [showLogin, setShowLogin] = useState<boolean>(false);


  const navigate = useNavigate();
  // const [sellerData,setSellerData] = useState(null);

  useEffect(() => {
    const fetchSellerDetails = async () => {
      const token = sessionStorage.getItem("seller");
      if (!token) {
        navigate("/SellerLanding"); // Redirect if no token found
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/Login", {
          headers: {
            "x-auth-token": token, // Send token in header
          },
        });
        // console.log(response);
        navigate("/Seller/");

        // setSellerData(response.data); // Set seller details in state
      } catch (error) {
        console.error("Error fetching seller details:", error);
        navigate("/SellerLanding"); // Redirect to login on error
      }
    };

    fetchSellerDetails();
  }, [navigate]);




  return (
    <div className={styles.container}>
      {/* Navigation Bar */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>SELLER HUB</div>
        <ul className={styles.navLinks}>
          <li><Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>Home</Link></li>
          <li>About</li>
          <li>Pricing</li>
          <li>Contact</li>
          <li>
            <button className={styles.sellerButton} onClick={() => setShowLogin(true)}>Seller Login</button>
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

      {showLogin && <SellerLogin onClose={() => setShowLogin(false)} />}
    </div>
  )
}

export default SellerApp