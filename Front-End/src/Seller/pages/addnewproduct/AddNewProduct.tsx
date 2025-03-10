import React, { useEffect, useState } from 'react'
import styles from './AddNewProduct.module.css'
import SubNav from '../mylisting/components/subNav/SubNav'
import img from '../../../assets/lens.jpg'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { toggleProductId } from '../../../redux/toogleSlice'
import { useNavigate } from 'react-router'

interface fetchedDataProps {
    _id:string;
    ListingStatus: number;
    categoryName: string;
    brandName: string;
    updatedAt: string;
    createdAt: string;
    qcStatus: number;
    skuId: string;
}

const AddNewProduct: React.FC = () => {

    const sellerId = "67c926173f7fe222ff32287e"

  const dispatch = useDispatch();

  // use navigation
const navigate = useNavigate();

    const [fetchedData, setfetchedData] = useState<fetchedDataProps[]>([])

    useEffect(() => {
        const fetchListingProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/product/fetchallproducts/${sellerId}`);
                console.log(response.data);
                setfetchedData(response.data.data)

            } catch (error: any) {
                console.log(error);

            }
        }

        fetchListingProduct();
    }, [])

// handle continue

const handleContinue = (_id:string) =>{
    try {
        dispatch(toggleProductId(_id));
        navigate("/Seller/AddNewProductToListing");
    } catch (error) {
        
    }
}
    return (
        <div className={styles.body}>
            <div className={styles.subNav}>
                <SubNav addnewlisting={true} subnavName={"Add New Product"} path={'/Seller/AddNewProductToListing'} />
            </div>
            <div className={styles.secSection}>
                <div className={styles.headingSection}>
                    <div className={styles.headName0}>Listing in Progress :</div>
                    <div className={styles.headName1}>Single Listings</div>
                    <div className={styles.headName2}>Bulk Listings</div>
                </div>
                <div className={styles.tableSection}>
                    {fetchedData && fetchedData.length > 0 &&
                        <table>
                            <thead>
                                <tr>
                                    <th>Product Details</th>
                                    <th>Status</th>
                                    <th>Created On</th>
                                    <th>Updated On</th>
                                    <th>Listing Improvement</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            {fetchedData.map((data, index) => (

                                <tbody>
                                    <tr>
                                        <td className={styles.imgTh}>
                                            <div className={styles.imgInproductDetials}>
                                                <img src={img} alt="" />
                                            </div>
                                            <div className={styles.productNamesec}>
                                                <div className={styles.productName}>{data.categoryName}</div>
                                                <div className={styles.SkU_IDSec}>
                                                    <span className={styles.SKU_ID}>SKU_ID : {data.skuId}</span> 
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {data.ListingStatus <= 3 && "Draft"}
                                            {data.ListingStatus > 3 && "Qc In Progress"}
                                            {data.qcStatus == 1 && "Completed"}
                                        </td>
                                        <td>
                                            {new Date(data.createdAt).toLocaleDateString("en-GB", {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit"
                                        })}
                                        </td>
                                        <td>
                                            {new Date(data.updatedAt).toLocaleDateString("en-GB", {
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit"
                                        })}
                                        </td>
                                        <td>{data.ListingStatus <= 3 ? "Complete it & send for QC" : "QC Progress"}</td>
                                        <td className={`${data.qcStatus == 1 ? styles.delete : styles.Continue}`}  onClick={() => handleContinue(data._id)} >{data.qcStatus == 1 ? "Delete" : "Continue"}</td>
                                    </tr>
                                </tbody>
                            ))}
                            {/* Close tbody */}
                        </table>}

                </div>
            </div>
        </div>
    )
}

export default AddNewProduct