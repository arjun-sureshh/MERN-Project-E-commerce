import styles from './Listing.module.css'
import SubNav from './components/subNav/SubNav'
import { useEffect, useState } from 'react'
import axios from 'axios'

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
  productId:string;
}

const Listing: React.FC = () => {

  const sellerId = "67c926173f7fe222ff32287e";
  // const [productId, setProductId] = useState<string>("")
  const [fetchedData, setfetchedData] = useState<fetchedDataProps[]>([]);

  // useeffect for fetch data from Product 
  // useEffect(() => {
  //     const fetchListingProduct = async () => {
  //         try {
  //             const response = await axios.get(`http://localhost:5000/api/product/fetchallproducts/${sellerId}`);
  //             console.log(response.data);
  //             setfetchedData(response.data.data)
  //             // setProductId(response.data.data._id)
  //         } catch (error: any) {
  //             console.log(error);

  //         }
  //     }
  //     fetchListingProduct();
  // }, []);

  // useeffect for fetch data from Product Variant
  useEffect(() => {

    const fetchProductVaraint = async () => {

      try {
        const response = await axios.get(`http://localhost:5000/api/productvaraint/fetchallproducts/${sellerId}`);
        console.log(response.data.data);
        setfetchedData(response.data.data);

      } catch (error: any) {
        console.log(error);

      }

    };

    fetchProductVaraint();

  }, [])

  // handle delete

  const handleDelete = async(productVaraintId:string,productId:string) =>{
    try {
      const response = await axios.delete(`http://localhost:5000/api/productvaraint/${productVaraintId}`)
      console.log(response.data);
    } catch (error:any) {
      console.log(error);
    }
    try {
      const response = await axios.delete(`http://localhost:5000/api/product/${productId}`)
      console.log(response.data);
    } catch (error:any) {
      console.log(error);
    }

    
  }
 


  return (
    <div className={styles.body}>
      <div className={styles.subNav}>
        <SubNav addnewlisting={true} subnavName={"My Listing"} path={'/Seller/AddNewProductToListing'} />
      </div>
      <div className={styles.updatesSection}>
        <div className={styles.updatesBoxs}>
          <div className={styles.borderradius}>
            <div className={styles.activeBox}>
              <div className={styles.boxSection1}>0</div>
              <div className={styles.boxSection2}>Active Listings</div>
            </div>
            <div className={styles.activeBox}>
              <div className={styles.boxSection1}>0</div>
              <div className={styles.boxSection2}>Ready For Activation</div>
            </div>
            <div className={styles.activeBox}>
              <div className={styles.boxSection1}>0</div>
              <div className={styles.boxSection2}>Blocked Listings</div>
            </div>
            <div className={styles.activeBox}>
              <div className={styles.boxSection1}>0</div>
              <div className={styles.boxSection2}>Inactive Listing</div>
            </div>
          </div>
          <div className={styles.activeBoxm}>
            <div className={styles.boxSection1}>0</div>
            <div className={styles.boxSection2}>Archived Listings</div>
          </div>
        </div>
        <div className={styles.productdetails}>
          {/* <Table headnames={["Product Details","Listing Price","Final Price","Stock","Category","Fulfillment","Listing Quality","Additional Info","Action"]}/> */}
          <div className={styles.body}>
            <table>
              <thead>
                <tr className={styles.head}>
                  <th>0</th>
                  {/* {
        headnames.map((names, index) => (
          <th key={index}>{names}</th>
        ))
      } */}
                  <th>Product Name</th>
                  <th>MRP</th>
                  <th>Selling Price</th>
                  <th>Stock</th>
                  <th>Category</th>
                  <th>Fulfillment</th>
                  <th>Brand Name</th>
                  <th>Product Disc</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  fetchedData.map((item, index) => (
                    <tr className={styles.details}>
                      <th>{index + 1}</th>
                      <th>{item.productTitle}</th>
                      <th>{item.mrp}</th>
                      <th>{item.sellingPrice}</th>
                      <th>dsv</th>
                      <th>{item.categoryName}</th>
                      <th>{item.fulfilmentBy}</th>
                      <th>{item.brandName}</th>
                      <th>{item.productDiscription}</th>
                      <th className={styles.delete} onClick={() => handleDelete(item._id,item.productId)}>Delete</th>
                    </tr>
                  ))}
              </tbody>
            </table>

          </div>
        </div>
      </div>

    </div>
  )
}

export default Listing