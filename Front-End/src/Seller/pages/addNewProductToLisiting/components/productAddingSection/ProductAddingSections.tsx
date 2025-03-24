import React, { useEffect, useState } from 'react'
import styles from './ProductAddingSections.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../../redux/store'
import { GiCheckMark } from "react-icons/gi";
import axios from 'axios';
import { toggleAddImage, toggleProductFields, toggleProductVaraintId, toggleResetProductData, toggleSearchKeyWordAdd, } from '../../../../../redux/toogleSlice';
import { useNavigate } from 'react-router';

interface fetchedDatas{
    stockqty:string;
}

const ProductAddingSections: React.FC = () => {

    const dispatch = useDispatch();
    // use navigation
    const navigate = useNavigate();
    const productAdddingState = useSelector((state: RootState) => state.toggle.productAdddingState) ?? 0;
    const productId = useSelector((state: RootState) => state.toggle.productId);
    const productFields = useSelector((state: RootState) => state.toggle.productFields);
    const ProductVaraintId = useSelector((state: RootState) => state.toggle.productVaraintId);

    const [fetchedData, setFetchedData] = useState<fetchedDatas[]>([]);
    const produKeyFeature = useSelector((state: RootState) => state.toggle.features);
    const searchKeyWords = useSelector((state: RootState) => state.toggle.searchKeyWords);
    const productImage = useSelector((state: RootState) => state.toggle.images);
    // const [formDataImages, setFormDataImages] = useState<[]>([]);

    // required fields for the price and stock page
    const requiredFields: (keyof typeof productFields)[] = [
        "skuId",
        "mrp",
        "sellingPrice",
        "stock",
        "shippingProvider",
        "localDeliveryCharge",
        "ZonalDeliveryCharge",
        "length",
        "breadth",
        "height",
        "weight",
        "HSN",
        "taxCode",
        "fullfilementBy",
        "ProcurementType",
        "shippingProvider",

        "productTitle",
        "productDiscription",
        "intheBox",
        "minimumOrderQty",
        "countryOfOrigin",
        "manufacturerDetails",
        "packerDetails",
    ];


    // useeffect to fetch the data 
    useEffect(() => {
        // fetch data from the product model
        const fetchDatasFromProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/product/fetchProductData/${productId}`);
                console.log(response.data);
                dispatch(toggleProductFields({ field: 'skuId', value: response.data.data.skuId }));
                dispatch(toggleProductFields({ field: 'fullfilementBy', value: response.data.data.fulfilmentBy }));
                dispatch(toggleProductFields({ field: 'localDeliveryCharge', value: response.data.data.localDeliveryCharge }));
                dispatch(toggleProductFields({ field: 'ZonalDeliveryCharge', value: response.data.data.zonalDeliveryCharge }));

            } catch (error: any) {
                console.error("Error fetching product status:", error.response?.data || error.message);
            }
        };

        // fetch data from the product Variant model

        const fetchDatasFromProductVaraint = async () => {
            if (!ProductVaraintId) return; // Prevent unnecessary API calls

            try {
                const response = await axios.get(`http://localhost:5000/api/productvaraint/fetchProductVaraintData/${ProductVaraintId}`);
                console.log(response.data);

                dispatch(toggleProductFields({ field: 'length', value: response.data.data.Length }));
                dispatch(toggleProductFields({ field: 'breadth', value: response.data.data.breadth }));
                dispatch(toggleProductFields({ field: 'height', value: response.data.data.height }));
                dispatch(toggleProductFields({ field: 'weight', value: response.data.data.weight }));


                dispatch(toggleProductFields({ field: 'countryOfOrigin', value: response.data.data.countryOfOrgin }));
                dispatch(toggleProductFields({ field: 'HSN', value: response.data.data.hsnCode }));
                dispatch(toggleProductFields({ field: 'intheBox', value: response.data.data.intheBox }));
                dispatch(toggleProductFields({ field: 'manufacturerDetails', value: response.data.data.manufactureDetails }));
                dispatch(toggleProductFields({ field: 'minimumOrderQty', value: response.data.data.minimumOrderQty }));
                dispatch(toggleProductFields({ field: 'mrp', value: response.data.data.mrp }));
                dispatch(toggleProductFields({ field: 'packerDetails', value: response.data.data.packerDetails }));
                dispatch(toggleProductFields({ field: 'productDiscription', value: response.data.data.productDiscription }));
                dispatch(toggleProductFields({ field: 'ProcurementType', value: response.data.data.ProcurementType }));
                dispatch(toggleProductFields({ field: 'ProcurementSLA', value: response.data.data.procurementSLA }));
                dispatch(toggleProductFields({ field: 'color', value: response.data.data.colorId }));
                dispatch(toggleProductFields({ field: 'productTitle', value: response.data.data.productTitle }));
                dispatch(toggleProductFields({ field: 'sellingPrice', value: response.data.data.sellingPrice }));
                dispatch(toggleProductFields({ field: 'shippingProvider', value: response.data.data.shippingProvider }));
                dispatch(toggleProductFields({ field: 'taxCode', value: response.data.data.taxCode }));
                dispatch(toggleProductFields({ field: 'warantySummary', value: response.data.data.warantySummary }));
                dispatch(toggleProductFields({ field: 'warrantyPeriod', value: response.data.data.warrantyPeriod }));

            } catch (error: any) {
                console.error("Error fetching product variant status:", error.response?.data || error.message);
            }
        };

        // fetch data from the stock model
        const fetchDatasFromStock = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/productstock/fetchProductStock/${ProductVaraintId}`);
                console.log(response.data);
                setFetchedData(response.data.data && response.data.data);
                dispatch(toggleProductFields({ field: 'stock', value: response.data.data.stockqty }));

            } catch (error: any) {
                console.error("Error fetching product status:", error.response?.data || error.message);
            }
        };

        // fetch data from the Features model
        const fetchDatasFromKeyFeatures = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/keyfeatures/fetchKeyFeaturesBYProductVaraintId/${ProductVaraintId}`);
                console.log(response.data);

            } catch (error: any) {
                console.error("Error fetching product status:", error.response?.data || error.message);
            }
        };

        // fetch data from the Size Words  model
        const fetchDatasFromSize = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/sizebody/fetchSizeBYProductVaraintId/${ProductVaraintId}`);
                console.log(response.data);
                dispatch(toggleProductFields({ field: 'sizebody', value: response.data.data.sizebody }));
                dispatch(toggleProductFields({ field: 'sizeHeadId', value: response.data.data.sizeHeadId }));
                
            } catch (error: any) {
                console.error("Error fetching product status:", error.response?.data || error.message);
            }
        };


        // fetch data from the Search Key Words  model
        const fetchDatasFromsearchKeyWord = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/searchkeyword/fetchSearchKeyBYProductVaraintId/${ProductVaraintId}`);
                console.log(response.data);
                dispatch(toggleSearchKeyWordAdd(response.data.data));
            } catch (error: any) {
                console.error("Error fetching product status:", error.response?.data || error.message);
            }
        };

        // fetch data from Image  model
        const fetchDatasFromImage = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/gallery/fetchImagesBYProductVaraintId/${ProductVaraintId}`);
                console.log(response.data);

                dispatch(toggleAddImage(response.data.data.photos));
            } catch (error: any) {
                console.error("Error fetching product status:", error.response?.data || error.message);
            }
        };



        if (productId) fetchDatasFromProduct();
        if (ProductVaraintId) {
            Promise.all([
                fetchDatasFromProductVaraint(),
                fetchDatasFromStock(),
                fetchDatasFromKeyFeatures(),
                fetchDatasFromsearchKeyWord(),
                fetchDatasFromSize(),
                fetchDatasFromImage(),
            ]);
        }

    }, [productId, ProductVaraintId]); // ✅ Ensure it runs when ProductVaraintId updates



    // update the skuid and fulfilemt by into the product collection
    const updateIntoProduct = async (listingStatus: number) => {

        if (!productId) {
            console.log("Missing product ID");
            return;
        }
        try {
            const response = await axios.put(`http://localhost:5000/api/product/skuidUpdate/${productId}`, { // ✅ Corrected URL
                skuId: productFields.skuId,
                fulfilmentBy: productFields.fullfilementBy,
                localDeliveryCharge: productFields.localDeliveryCharge,
                zonalDeliveryCharge: productFields.ZonalDeliveryCharge,// Ensure key matches backend expectations
                ListingStatus: listingStatus, // ✅ Pass status dynamically
            });
            console.log(response.data.message);
        } catch (error) {
            console.error("Error updating skuId, Fulfilemt By:", error);
        }
    };

    // create an empty variant of the product first when we click the save and btn
    const createProductVaraint = async () => {

        if (!productId) {
            alert("Missing product ID");
            return;
        }

        try {
            const response = await axios.post(`http://localhost:5000/api/productvaraint`, { // ✅ Corrected URL
                productId: productId,
            });
            const productVaraintId = response.data.data._id;
            dispatch(toggleProductVaraintId(productVaraintId));
            console.log(response.data);
            return productVaraintId;
        } catch (error) {
            console.error("Error updating :", error);
        }
    };


    // create other fields into productvarient
    const updateProductVariant = async (variantID: string | null) => {

        if (!variantID) {
            // alert("Missing Product Variant ID");
            console.log("Missing Product Variant ID in update ProductVaraint");
            return;
        };

        try {
            const response = await axios.put(`http://localhost:5000/api/productvaraint/updateVaraint/${variantID}`, { // ✅ Corrected URL
                productId: productId,
                mrp: productFields.mrp,
                sellingPrice: productFields.sellingPrice,
                minimumOrderQty: productFields.minimumOrderQty,
                shippingProvider: productFields.shippingProvider,
                Length: productFields.length,
                breadth: productFields.breadth,
                weight: productFields.weight,
                height: productFields.height,
                hsnCode: productFields.HSN,
                taxCode: productFields.taxCode,
                countryOfOrgin: productFields.countryOfOrigin,
                manufactureDetails: productFields.manufacturerDetails,
                packerDetails: productFields.packerDetails,
                productDiscription: productFields.productDiscription,
                productTitle: productFields.productTitle,
                procurementType: productFields.ProcurementType,
                procurementSLA: productFields.ProcurementSLA,
                colorId: productFields.color,
                intheBox: productFields.intheBox,
                warrantyPeriod: productFields.warrantyPeriod,
                warantySummary: productFields.warantySummary,
            });
            console.log(response.data.message);
        } catch (error) {
            console.error("Error updating :", error);
        }
    };

    // handle key features
    const handleKeyFeatures = async (variantID: string | null) => {

        if (
            produKeyFeature.length < 0 ||
            produKeyFeature && 
            produKeyFeature.every(feature => 
                feature.title.trim() === "" || feature.content.trim() === ""
            )
        )
         {
            console.log("Key Features are missing, so we didn't activate the API");
            return;
        }
        
        if (!variantID) {
            // alert("Missing product variant ID");
            console.log("Missing Product Variant ID in update keyfeatures");

            return;
        }



        try {
            const response = await axios.post(`http://localhost:5000/api/keyfeatures`, {
                productVariantId: variantID,
                features: produKeyFeature // ✅ Pass an array of { title, content }
            });

            console.log(response.data.message);
        } catch (error) {
            console.error("Error updating:", error);
        }
    };


    //  insert the search key Words
    const handleSearchKeywords = async (variantID: string | null) => {

        console.log(searchKeyWords.length);
        console.log(searchKeyWords,"seracjhKeyWord");
        
        
        if (searchKeyWords.length < 0 || searchKeyWords && searchKeyWords.every(keyword => keyword.searchKeyWord.trim() === "")) {
            console.log("Missing SearchKey so we didnt active the API");
            return;
        }


        if (!variantID) {
            // alert("Missing product  Varaint ID");
            console.log("Missing Product Variant ID in update search");
            return;
        }


        try {
            console.log("Handle Search KeyWord Working");
            
            const response = await axios.post(`http://localhost:5000/api/searchkeyword`, {
                productVariantId: variantID,
                searchKeyWords: searchKeyWords // ✅ Pass an array of { searchKeyWord }
            });
            

            console.log(response.data.message);
        } catch (error) {
            console.error("Error updating:", error);
        }
    };


    // handel image

    const handleImage = async (variantID: string | null) => {
        if (!productImage || productImage.length === 0) {
            console.error("No files selected");
            return;
        }
        if (!variantID) {
            console.error("Missing Product Variant ID in update image");
            return;
        }
    
        try {
            const formData = new FormData();
    
            productImage.forEach((file) => {
                formData.append("photos", file); // Ensure correct key name
            });
    
            formData.append("productVariantId", variantID); // Ensure correct field name
    
            const response = await axios.post("http://localhost:5000/api/gallery/gallery", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
    
            console.log("Upload success:", response.data);
        } catch (error: any) {
            console.error("Error uploading images:", error);
            if (error.response) {
                console.error("Server Response:", error.response.data);
            }
        }
    };
    


    // handle the stock field
    const handleStock = async (variantID: string | null) => {
        if (!productFields.stock) {
            console.log("Missing product Stock so we didnt Active the API");
            return;
        }
        if (!variantID) {
            console.log("Missing Product Variant ID in update stock");
            return;
        }

        try {
            const response = await axios.post(`http://localhost:5000/api/productstock`, {
                productvariantId: variantID,
                stockqty: productFields.stock // ✅ Pass an array of { searchKeyWord }
            });

            console.log(response.data.message);
        } catch (error) {
            console.error("Error updating:", error);
        }
    };

    // update the stock if it already exixt in the variant
/////////////////////////////////////////////////////////////
    const handleUpdateTheStock = async (variantID: string | null) => {
        if (!productFields.stock) {
            console.log("Missing product Stock so we didnt Active the API");
            return;
        }
        if (!variantID) {
            console.log("Missing Product Variant ID in update stock");
            return;
        }

        try {
            const response = await axios.put(`http://localhost:5000/api/productstock/updateStock/${variantID}`, {
                stockqty: productFields.stock // ✅ Pass an array of { searchKeyWord }
            });

            console.log(response.data.message);
        } catch (error) {
            console.error("Error updating:", error);
        }
    };

    // handle  adding the size of the product
    const handleCreateSize = async (variantID: string | null) => {

        if (!productFields.sizebody && !productFields.sizeHeadId) {
            console.log("Missing product size and missing the Product Type so we didnt Active the API");
            return;
        }
        if (!variantID) {
            console.log("Missing Product Variant ID in update stock");
            return;
        }

        try {
            const response = await axios.post(`http://localhost:5000/api/sizebody`, {
                productvariantId: variantID,
                size: productFields.sizebody,
                sizeHeadNameId: productFields.sizeHeadId // ✅ Pass an array of { searchKeyWord }
            });
            console.log(response.data);
        } catch (error) {
            console.error("Error updating:", error);
        }
    };


    // handle Save And Back Button........
    const handleSaveAndBack = async () => {

        await updateIntoProduct(3);

        let variantID: string | null = ProductVaraintId;
        if (!variantID) {
            variantID = await createProductVaraint(); // Ensure it completes before proceeding
        }

        await updateProductVariant(variantID);

        handleKeyFeatures(variantID);
        handleSearchKeywords(variantID);
        handleImage(variantID);
        handleStock(variantID);
        handleCreateSize(variantID);

        dispatch(toggleProductVaraintId(""));
        dispatch(toggleResetProductData());

        navigate("/Seller/AddNewProduct");
    };

    // handle handle Send To QC
    const handleSendToQC = async () => {
        for (const key of requiredFields) {
            if (!productFields[key]) {  // Check only required fields
                alert(`Please fill in the ${key} field.`);

                // Focus on the corresponding input field
                //   inputRefs[key]?.current?.focus();
                return;
            }
        }
        if (!productImage || productImage.length === 0) {
            alert("No Images selected");
            return;
        }

        await updateIntoProduct(4);

        let variantID: string | null = ProductVaraintId;
        if (!variantID) {
            variantID = await createProductVaraint(); // Ensure it completes before proceeding
        }

        await updateProductVariant(variantID);

        handleKeyFeatures(variantID);
        handleSearchKeywords(variantID);
        handleImage(variantID);
        handleStock(variantID);
        handleCreateSize(variantID);

        dispatch(toggleProductVaraintId(""));
        dispatch(toggleResetProductData());

        navigate("/Seller/AddNewProduct");
    };

    // handle the create another variant for the product

    const handleCreateAnotherVariant = async () => {
        for (const key of requiredFields) {
            if (!productFields[key]) {  // Check only required fields
                alert(`Please fill in the ${key} field.`);

                // Focus on the corresponding input field
                //   inputRefs[key]?.current?.focus();
                return;
            }
        }
        if (!productImage || productImage.length === 0) {
            alert("No Images selected");
            return;
        }

        await updateIntoProduct(3);

        let variantID: string | null = ProductVaraintId;
        if (!variantID) {
            variantID = await createProductVaraint(); // Ensure it completes before proceeding
        }

        await updateProductVariant(variantID);

        handleKeyFeatures(variantID);
        handleSearchKeywords(variantID);
        handleImage(variantID);
        handleStock(variantID);
        handleCreateSize(variantID);

        dispatch(toggleProductVaraintId(""));
        dispatch(toggleResetProductData());

    }




    return (
        <div className={styles.body}>
            <div className={styles.section1}>
                <div className={`${styles.steps}`}>
                    <div className={`${styles.number}  ${productAdddingState === 1 ? styles.processing : productAdddingState >= 2 ? styles.saved : ""}`}>
                        {productAdddingState >= 2 ? <GiCheckMark /> : 1}
                    </div>
                    <div className={styles.stepName}>Select Category</div>
                </div>
                <div className={styles.steps}>
                    <div className={`${styles.number}  ${productAdddingState === 2 ? styles.processing : productAdddingState >= 3 ? styles.saved : ""}`}>
                        {productAdddingState >= 3 ? <GiCheckMark /> : 2}</div>
                    <div className={styles.stepName}>Select Brand</div>
                </div>
                <div className={styles.steps}>
                    <div className={`${styles.number}  ${productAdddingState === 3 ? styles.processing : productAdddingState > 3 ? styles.saved : ""}`}>
                        {productAdddingState > 3 ? <GiCheckMark /> : 3}
                    </div>
                    <div className={styles.stepName}>Add Product Details</div>
                </div>
            </div>
            <div className={styles.section2}>
                <div className={styles.btn} onClick={handleCreateAnotherVariant}>Create Another Variant</div>
                <div className={styles.btn} onClick={handleSaveAndBack}>Save & Go Back</div>
                <div className={styles.btn} onClick={handleSendToQC} >Send to QC</div>
            </div>
        </div>
    )
}

export default ProductAddingSections