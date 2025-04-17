import React, { useEffect, useState } from 'react';
import styles from './HomePage.module.css';
import Navbar from './components/navBar/Navbar';
import Banners from './components/banner/Banners';
import BestProductLIst from './components/bestProductslist/BestProductLIst';
import Footer from '../User/components/Footer/Footer';
import axios from 'axios';
import { Product, CategoryGroup } from './components/types';

interface CategoryData {
  categoryId: string;
  products: Product[];
}

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [electronics, setElectronics] = useState<CategoryData>({ categoryId: '', products: [] });
  const [mobiles, setMobiles] = useState<CategoryData>({ categoryId: '', products: [] });
  const [fashion, setFashion] = useState<CategoryData>({ categoryId: '', products: [] });
  const [furniture, setFurniture] = useState<CategoryData>({ categoryId: '', products: [] });


  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/product/grouped-by-category');
        const productData: CategoryGroup[] = response.data.data || [];
        console.log(response.data);

        setElectronics({ categoryId: '', products: [] });
        setMobiles({ categoryId: '', products: [] });
        setFashion({ categoryId: '', products: [] });
        setFurniture({ categoryId: '', products: [] });

        productData.forEach((category: CategoryGroup) => {
          const products = category.products || [];
          switch (category.categoryName) {
            case 'Electronics':
              setElectronics({ categoryId: category.categoryId, products });
              break;
            case 'Mobiles':
              setMobiles({ categoryId: category.categoryId, products });
              break;
            case 'Fashion':
              setFashion({ categoryId: category.categoryId, products });
              break;
            case 'Furniture':
              setFurniture({ categoryId: category.categoryId, products });
              break;
            default:
              console.log(`Unhandled category: ${category.categoryName}`);
              break;
          }
        });

        setLoading(false);
      } catch (error: any) {
        console.error('Error fetching products:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.body}>
      <div className={styles.navBar}>
        <Navbar />
      </div>
      <div className={styles.bannerSec}>
        <Banners />
      </div>
      <div className={styles.productListing}>
        {electronics.products.length > 0 && (
          <BestProductLIst
            title="Electronics"
            products={electronics.products}
            topcategoryId={electronics.categoryId}
          />
        )}
        {mobiles.products.length > 0 && (
          <BestProductLIst
            title="Mobiles"
            products={mobiles.products}
            topcategoryId={mobiles.categoryId}
          />
        )}
        {fashion.products.length > 0 && (
          <BestProductLIst
            title="Fashion"
            products={fashion.products}
            topcategoryId={fashion.categoryId}
          />
        )}
        {furniture.products.length > 0 && (
          <BestProductLIst
            title="Furniture"
            products={furniture.products}
            topcategoryId={furniture.categoryId}
          />
        )}
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;