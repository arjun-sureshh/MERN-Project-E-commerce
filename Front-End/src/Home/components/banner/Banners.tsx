import React from 'react';
import styles from './Banners.module.css';
import SmallCart from './components/smallCart/SmallCart';
import MainCarousel from './components/mainCarousel/MainCarousel';
import img from '../../../assets/iphone-black.jpg';

const Banners: React.FC = () => {
  return (
    <div className={styles.body}>
      <div className={styles.addBanner}>
        <MainCarousel />
      </div>
      <div className={styles.smallCard}>
        <SmallCart
          title="Best Sale"
          item="Laptops Max"
          feature="From $169.00 or $64.63/mo"
          img={img}
          backgroundclr="clr1"
        />
        <SmallCart
          title="Best Sale"
          item="Laptops Max"
          feature="From $169.00 or $64.63/mo"
          img={img}
          backgroundclr="clr2"
        />
        <SmallCart
          title="Best Sale"
          item="Laptops Max"
          feature="From $169.00 or $64.63/mo"
          img={img}
          backgroundclr="clr3"
        />
        <SmallCart
          title="Best Sale"
          item="Laptops Max"
          feature="From $169.00 or $64.63/mo"
          img={img}
          backgroundclr="clr4"
        />
      </div>
    </div>
  );
};

export default Banners;