import React, { useEffect, useState } from 'react';
import styles from './ListingProduct.module.css';
import ProductShow from './components/productShow/ProductShow';
import axios from 'axios';

// Define the product type based on your API response
interface Product {
  color: any;
  productId: string;
  productTitle: string;
  sellingPrice: number;
  mrp: number;
  image: string;
  brandName?: string;
  sellerName?: string;
  topcategoryId?: string;
}

interface ApiResponse {
  categoryId: string;
  categoryName: string;
  productCount: number;
  products: Product[];
}

const ListingProduct: React.FC = () => {
  const clickedCategory= sessionStorage.getItem("clickedCategoryId");
  const [products, setProducts] = useState<Product[]>([]); // State to hold products
  const [loading, setLoading] = useState(false); // Optional: For loading state
  const [error, setError] = useState<string | null>(null); // Optional: For error handling

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.post("http://localhost:5000/api/product/ByTopCategory", { clickedCategory });
        console.log("API Response:", response.data);

        // Assuming the API returns data in the format from your backend
        const productData: ApiResponse[] = response.data.data;
        if (productData && productData.length > 0) {
          // Since you're filtering by one category, take the first group's products
          setProducts(productData[0].products);
        } else {
          setProducts([]);
        }
        setLoading(false);
      } catch (error: any) {
        console.error("Error fetching products:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    if (clickedCategory) {
      fetchProductDetails();
    }
  }, [clickedCategory]); // Re-run when clickedCategory changes

  if (loading) {
    return <div className={styles.body}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.body}>Error: {error}</div>;
  }

  return (
    <div className={styles.body}>
      <div className={styles.productsRow}>
        {products.length > 0 ? (
          products.map((product) => (
            <ProductShow
              key={product.productId}
              productId={product.productId}
              productTitle={product.productTitle}
              sellingPrice={product.sellingPrice}
              mrp={product.mrp}
              image={product.image}
              brandName={product.brandName}
              sellerName={product.sellerName}
              productColor={product.color}
            />
          ))
        ) : (
          <div>No products found for this category.</div>
        )}
      </div>
    </div>
  );
};

export default ListingProduct;