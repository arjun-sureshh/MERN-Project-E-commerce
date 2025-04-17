import React, { useEffect, useState } from 'react'
import styles from './Inventory.module.css'
import Path from '../../../components/path/Path'
import axios from 'axios'
import img from '../../../assets/lens.jpg'
import { useNavigate } from 'react-router'


interface fetchedDataProps {
    _id: string;
    mrp: number;
    sellingPrice: string;
    productDiscription: string;
    productTitle: string;
    colorId: string;
    colorName: number;
    fulfilmentBy: string;
    brandName: string;
    categoryName: string;
    productId: string;
    stockqty?: string;
}

interface sellerData {
    _id: string;
    storeDiscription: string;
    sellerName: string;
    sellerMobileNumber: string;
    sellerGST: string;
    sellerEmail: string;
    sellerDisplayName: string;
    qcStatus: string;
    ifscCode: string;
    createdAt: string;
    bankAccountNo: string;
    ListingStatus?: string;
  }
  

const Inventory: React.FC = () => {

    const [fetchedData, setfetchedData] = useState<fetchedDataProps[]>([]);
    const [addStock, setAddStock] = useState<{ [key: string]: boolean }>({});

    const [stockInput, setStockInput] = useState<string>("");

    const navigate = useNavigate();
  const [sellerData, setSellerData] = useState<sellerData>({
    _id: "",
    storeDiscription: "",
    sellerName: "",
    sellerMobileNumber: "",
    sellerGST: "",
    sellerEmail: "",
    sellerDisplayName: "",
    qcStatus: "",
    ifscCode: "",
    createdAt: "",
    bankAccountNo: "",
    ListingStatus: "",
  });

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
        setSellerData(response.data); // Set seller details in state
        // console.log(response.data, "sellerdata");
      } catch (error) {
        console.error("Error fetching seller details:", error);
        // navigate("/login"); // Redirect to login on error
      }
    };

    fetchSellerDetails();
  }, [navigate]);

    useEffect(() => {

        const fetchProductVaraint = async () => {
            const sellerId = sellerData._id;

            try {
                const response = await axios.get(`http://localhost:5000/api/productvaraint/fetchallproducts/${sellerId}`);
                console.log(response.data.data);
                setfetchedData(response.data.data);
                const variantdata = response.data.data;
                const productVariantIds = variantdata.map((productVariant: { _id: any; }) => productVariant._id); // Use response directly
                if (productVariantIds.length > 0) {
                    fetchProducstock(productVariantIds);
                    fetchDatasFromImage(productVariantIds);
                }

            } catch (error: any) {
                console.log(error);

            }

        };

        // fetch the stock based on the Variant
        const fetchProducstock = async (productVariantIds: string[]) => {
            console.log("Fetching Variants from Product IDS:", productVariantIds);

            try {
                const response = await axios.post("http://localhost:5000/api/productstock/fetchstockByProductVariantId", { productVariantIds });
                console.log("Fetched Product stock:", response.data);
                const stockdata = response.data.data;

                setfetchedData((prevSellers) =>
                    prevSellers.map((product) => {
                        const productVariant = stockdata.find((stock: { productvariantId: string }) => stock.productvariantId === product._id);
                        return {
                            ...product,
                            stockqty: productVariant?.stockqty || "No stockqty found"
                        };
                    })
                );

            } catch (error: any) {
                console.error("Error fetching addresses:", error);
            }
        };

        // fetch data from Image  model
        const fetchDatasFromImage = async (ProductVaraintId: string) => {

            console.log(ProductVaraintId);

            try {
                const response = await axios.get(`http://localhost:5000/api/gallery/fetchImagesBYProductVaraintId/${ProductVaraintId}`);
                console.log(response.data);
                const images = response.data.data;

                // setfetchedData((prevSellers) =>
                //     prevSellers.map((product) => {
                //         const productVariant = images.find((stock: { productvariantId: string }) => stock.productvariantId === product._id);
                //         return {
                //             ...product,
                //             stockqty: productVariant?.stockqty || "No stockqty found"
                //         };
                //     })
                // );
            } catch (error: any) {
                console.error("Error fetching product status:", error.response?.data || error.message);
            }
        };

        fetchProductVaraint();

    }, [addStock]);

    const handleAddStock = async (VariatID: string) => {
        if (!stockInput) {
            console.log("Missing product Stock so we didn’t activate the API");
            return;
        }
        if (!VariatID) {
            console.log("Missing Product Variant ID in update stock");
            return;
        }
    
        try {
            const response = await axios.put(`http://localhost:5000/api/productstock/AddStock/${VariatID}`, {
                stockqty: stockInput
            });
            setAddStock(prev => ({ ...prev, [VariatID]: false })); // Close input only for this product
            console.log(response.data.message);
        } catch (error) {
            console.error("Error updating:", error);
        }
    };
    

    return (
        <div className={styles.body}>
            <div className={styles.headSection}>
                <div className={styles.titleSec}>
                    <Path />
                    <div className={styles.title}>Inventory</div>
                </div>
                <div className={styles.btnSec}>
                    <div className={styles.btns}>
                        <div className={styles.btnblock}>
                            <div className={styles.btn}>
                                <div className={styles.inbtn1}>All Inventory</div>
                                <div className={styles.inbtn2}>0</div>
                            </div>
                            <div className={styles.btn}>
                                <div className={styles.inbtn1}>Low Stock</div>
                                <div className={styles.inbtn2}>0</div>
                            </div>
                            <div className={styles.btn}>
                                <div className={styles.inbtn1}>Out Of Stock</div>
                                <div className={styles.inbtn2}>0</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* display container */}

            <div className={styles.productdetailSec}>
                <div className={styles.tableContainer}>
                    <div className={styles.table}>
                        {/* Header Row */}
                        <div className={`${styles.row} ${styles.headerRow}`}>
                            <div className={styles.indexCell}>#</div>
                            <div className={styles.cell}>
                                Product Name
                            </div>
                            <div className={styles.cell}>
                                current Stock
                            </div>
                            <div className={styles.cell}>
                                Action
                            </div>
                        </div>

                        {/* Data Rows */}
                        {fetchedData.length > 0 ? (
                            fetchedData.map((data, index) => (
                                <div className={styles.row}>
                                    <div className={styles.indexCell}>{index + 1}</div>
                                    <div className={styles.cell}>
                                        <div className={styles.imgInproductDetials}>
                                            <img src={img} alt="Product" />
                                        </div>
                                        <div className={styles.productTitle}>
                                            {data.productTitle}

                                        </div>
                                    </div>
                                    <div className={styles.cell}>
                                        {data.stockqty}
                                    </div>
                                    <div className={styles.cell}>
                                        <div className={styles.addStock}  onClick={() => setAddStock(prev => ({ ...prev, [data._id]: !prev[data._id] }))}>
                                            Add Stock
                                        </div>
                                        {addStock[data._id] && <div className={styles.inputAddStock}>
                                            <input type="number" onChange={(e) => setStockInput(e.target.value)} />
                                            <span className={styles.btnAdd} onClick={() => handleAddStock(data._id)}>Add</span>
                                        </div>}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className={styles.noData}>No data available</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Inventory