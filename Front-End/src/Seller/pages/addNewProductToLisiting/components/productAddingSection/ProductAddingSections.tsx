import React, { useEffect, useState } from 'react'
import styles from './ProductAddingSections.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../../redux/store'
import { GiCheckMark } from "react-icons/gi";
import axios from 'axios';
import { toggleAddImage, toggleProductFields, toggleProductVaraintId, toggleResetProductData, toggleSearchKeyWordAdd, } from '../../../../../redux/toogleSlice';
import { useNavigate } from 'react-router';

interface fetchedDatas {
    ProductVariantId:string;
    productId:string;
    stockqty: string;
    skuId: string;
    mrp: string;
    fullfilementBy: string;
    ProcurementType: string;
    ProcurementSLA: string;
    sellingPrice: string;
    stock: string;
    shippingProvider: string;
    localDeliveryCharge: string;
    ZonalDeliveryCharge: string;
    length: string;
    breadth: string;
    height: string;
    weight: string;
    HSN: string;
    taxCode: string;

    countryOfOrigin: string;
    manufacturerDetails: string;
    packerDetails: string;
    productTitle: string;
    productDiscription: string;
    intheBox: string;
    minimumOrderQty: string;
    color: string;

    warantySummary: string;
    warrantyPeriod: string;
    searchKeyword: string;
    featureTitle: string;
    featureContent: string;
    size: string;
    sizeHeadId: string;
}

const ProductAddingSections: React.FC = () => {

    const dispatch = useDispatch();
    // use navigation
    const navigate = useNavigate();
    const productAdddingState = useSelector((state: RootState) => state.toggle.productAdddingState) ?? 0;
    const productId = useSelector((state: RootState) => state.toggle.productId);
    const productFields = useSelector((state: RootState) => state.toggle.productFields);
    const ProductVaraintId = useSelector((state: RootState) => state.toggle.productVaraintId);
    const [productVariants, setProductVariants] = useState<any[]>([]);
    const [fetchedData, setFetchedData] = useState<fetchedDatas[]>([]);
    const produKeyFeature = useSelector((state: RootState) => state.toggle.features);
    const searchKeyWords = useSelector((state: RootState) => state.toggle.searchKeyWords);
    const specification = useSelector((state: RootState) => state.toggle.productSpecification);
   const [selectedVariant, setSelectedVariant] = useState<fetchedDatas>({
    ProductVariantId:"",
    productId:"",
    stockqty: "",
    skuId: "",
    mrp: "",
    fullfilementBy: "",
    ProcurementType: "",
    ProcurementSLA: "",
    sellingPrice: "",
    stock: "",
    shippingProvider: "",
    localDeliveryCharge: "",
    ZonalDeliveryCharge: "",
    length:"",
    breadth:"",
    height: "",
    weight: "",
    HSN: "",
    taxCode: "",

    countryOfOrigin: "",
    manufacturerDetails: "",
    packerDetails: "",
    productTitle: "",
    productDiscription: "",
    intheBox: "",
    minimumOrderQty: "",
    color: "",

    warantySummary: "",
    warrantyPeriod: "",
    searchKeyword: "",
    featureTitle: "",
    featureContent: "",
    size: "",
    sizeHeadId: "",
   })
    const productImage = useSelector((state: RootState) => state.toggle.images);

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
                const product_Id = response.data.data._id;
                dispatch(toggleProductFields({ field: 'skuId', value: response.data.data.skuId }));
                dispatch(toggleProductFields({ field: 'fullfilementBy', value: response.data.data.fulfilmentBy }));
                dispatch(toggleProductFields({ field: 'localDeliveryCharge', value: response.data.data.localDeliveryCharge }));
                dispatch(toggleProductFields({ field: 'ZonalDeliveryCharge', value: response.data.data.zonalDeliveryCharge }));

                if (product_Id) {
                    fetchDatasFromProductVaraint(product_Id)
                };

            } catch (error: any) {
                console.error("Error fetching product status:", error.response?.data || error.message);
            }
        };

        // fetch data from the product Variant model

        const fetchDatasFromProductVaraint = async (product_Id: string) => {
            if (!product_Id) return; // Prevent unnecessary API calls

            try {
                const response = await axios.get(`http://localhost:5000/api/productvaraint/fetchVaraintByProductId/${product_Id}`);
                // console.log(response.data);

                // Assuming response.data.data is the array of variants
                const variants = response.data.data;
                setFetchedData(variants)
                console.log(fetchedData,"FETCHED DATA");
                
                // Store all variants in useState
                setProductVariants(variants);
                // store all varaonts
                // Check if there’s at least one variant to set in Redux
                if (variants.length > 0) {
                    const firstVariant = variants[0]; // Get the first variant
                    const productVariantId = firstVariant._id;

                    // Dispatch the first variant's data to Redux
                    dispatch(toggleProductFields({ field: 'length', value: firstVariant.Length }));
                    dispatch(toggleProductFields({ field: 'breadth', value: firstVariant.breadth }));
                    dispatch(toggleProductFields({ field: 'height', value: firstVariant.height }));
                    dispatch(toggleProductFields({ field: 'weight', value: firstVariant.weight }));
                    dispatch(toggleProductFields({ field: 'countryOfOrigin', value: firstVariant.countryOfOrgin }));
                    dispatch(toggleProductFields({ field: 'HSN', value: firstVariant.hsnCode }));
                    dispatch(toggleProductFields({ field: 'intheBox', value: firstVariant.intheBox }));
                    dispatch(toggleProductFields({ field: 'manufacturerDetails', value: firstVariant.manufactureDetails }));
                    dispatch(toggleProductFields({ field: 'minimumOrderQty', value: firstVariant.minimumOrderQty }));
                    dispatch(toggleProductFields({ field: 'mrp', value: firstVariant.mrp }));
                    dispatch(toggleProductFields({ field: 'packerDetails', value: firstVariant.packerDetails }));
                    dispatch(toggleProductFields({ field: 'productDiscription', value: firstVariant.productDiscription }));
                    dispatch(toggleProductFields({ field: 'ProcurementType', value: firstVariant.procurementType }));
                    dispatch(toggleProductFields({ field: 'ProcurementSLA', value: firstVariant.procurementSLA }));
                    dispatch(toggleProductFields({ field: 'color', value: firstVariant.colorId }));
                    dispatch(toggleProductFields({ field: 'productTitle', value: firstVariant.productTitle }));
                    dispatch(toggleProductFields({ field: 'sellingPrice', value: firstVariant.sellingPrice }));
                    dispatch(toggleProductFields({ field: 'shippingProvider', value: firstVariant.shippingProvider }));
                    dispatch(toggleProductFields({ field: 'taxCode', value: firstVariant.taxCode }));
                    dispatch(toggleProductFields({ field: 'warantySummary', value: firstVariant.warantySummary }));
                    dispatch(toggleProductFields({ field: 'warrantyPeriod', value: firstVariant.warrantyPeriod }));
                    dispatch(toggleAddImage(firstVariant.photos));
                    dispatch(toggleProductFields({ field: 'stock', value: firstVariant.stockqty }));
                    dispatch(toggleProductFields({ field: 'sizebody', value: firstVariant.size }));
                    dispatch(toggleProductFields({ field: 'sizeHeadId', value: firstVariant.sizeHeadId }));
                    dispatch(toggleSearchKeyWordAdd(response.data.data));

                    // Call additional fetch functions with the first variant's ID
                    // if (productVariantId) {
                    //     fetchDatasFromStock(productVariantId);
                    //     fetchDatasFromKeyFeatures(productVariantId);
                    //     fetchDatasFromsearchKeyWord(productVariantId);
                    //     fetchDatasFromSize(productVariantId);
                    //     fetchDatasFromImage(productVariantId);
                    // }
                }
            } catch (error: any) {
                console.error("Error fetching product variant status:", error.response?.data || error.message);
            }
        };

        // // fetch data from the stock model
        // const fetchDatasFromStock = async (productVariantId: string) => {

        //     if (!productVariantId) return; // Prevent unnecessary API calls

        //     try {
        //         const response = await axios.get(`http://localhost:5000/api/productstock/fetchProductStock/${productVariantId}`);
        //         console.log(response.data);
        //         setFetchedData(response.data.data && response.data.data);
        //         dispatch(toggleProductFields({ field: 'stock', value: response.data.data.stockqty }));

        //     } catch (error: any) {
        //         console.error("Error fetching product status:", error.response?.data || error.message);
        //     }
        // };

        // // fetch data from the Features model
        // const fetchDatasFromKeyFeatures = async (productVariantId: string) => {
        //     if (!productVariantId) return; // Prevent unnecessary API calls

        //     try {
        //         const response = await axios.get(`http://localhost:5000/api/keyfeatures/fetchKeyFeaturesBYProductVaraintId/${productVariantId}`);
        //         console.log(response.data);

        //     } catch (error: any) {
        //         console.error("Error fetching product status:", error.response?.data || error.message);
        //     }
        // };

        // // fetch data from the Size Words  model
        // const fetchDatasFromSize = async (productVariantId: string) => {
        //     if (!productVariantId) return; // Prevent unnecessary API calls

        //     try {
        //         const response = await axios.get(`http://localhost:5000/api/sizebody/fetchSizeBYProductVaraintId/${productVariantId}`);
        //         console.log(response.data);
        //         dispatch(toggleProductFields({ field: 'sizebody', value: response.data.data.sizebody }));
        //         dispatch(toggleProductFields({ field: 'sizeHeadId', value: response.data.data.sizeHeadId }));

        //     } catch (error: any) {
        //         console.error("Error fetching product status:", error.response?.data || error.message);
        //     }
        // };


        // // fetch data from the Search Key Words  model
        // const fetchDatasFromsearchKeyWord = async (productVariantId: string) => {
        //     if (!productVariantId) return; // Prevent unnecessary API calls

        //     try {
        //         const response = await axios.get(`http://localhost:5000/api/searchkeyword/fetchSearchKeyBYProductVaraintId/${productVariantId}`);
        //         console.log(response.data);
        //         dispatch(toggleSearchKeyWordAdd(response.data.data));
        //     } catch (error: any) {
        //         console.error("Error fetching product status:", error.response?.data || error.message);
        //     }
        // };

        // // fetch data from Image  model
        // const fetchDatasFromImage = async (productVariantId: string) => {
        //     if (!productVariantId) return; // Prevent unnecessary API calls

        //     try {
        //         const response = await axios.get(`http://localhost:5000/api/gallery/fetchImagesBYProductVaraintId/${productVariantId}`);
        //         console.log(response.data);

        //         dispatch(toggleAddImage(response.data.data.photos));
        //     } catch (error: any) {
        //         console.error("Error fetching product status:", error.response?.data || error.message);
        //     }
        // };



        if (productId) fetchDatasFromProduct();


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
        ) {
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
        console.log(searchKeyWords, "seracjhKeyWord");


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

    //  insert the Specification
    const handleSpecifications = async (variantID: string | null) => {

        console.log(specification.length);
        console.log(specification, "seracjhKeyWord");


        if (specification.length < 0 || specification && specification.every(keyword => keyword.specification.trim() === "")) {
            console.log("Missing Specification so we didnt active the API");
            return;
        }


        if (!variantID) {
            // alert("Missing product  Varaint ID");
            console.log("Missing Product Variant ID in update search");
            return;
        }


        try {
            console.log("Handle Specification Working");

            const response = await axios.post(`http://localhost:5000/api/specification`, {
                productVariantId: variantID,
                specification: specification // ✅ Pass an array of { searchKeyWord }
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
 // select Variant
 const handleSelectVariant =(Variant:any) =>{
  setSelectedVariant(Variant);
    console.log(Variant,"selected variant");
    dispatch(toggleResetProductData());
    // Dispatch the first variant's data to Redux
    dispatch(toggleProductFields({ field: 'length', value: Variant.Length }));
    dispatch(toggleProductFields({ field: 'breadth', value: Variant.breadth }));
    dispatch(toggleProductFields({ field: 'height', value: Variant.height }));
    dispatch(toggleProductFields({ field: 'weight', value: Variant.weight }));
    dispatch(toggleProductFields({ field: 'countryOfOrigin', value: Variant.countryOfOrgin }));
    dispatch(toggleProductFields({ field: 'HSN', value: Variant.hsnCode }));
    dispatch(toggleProductFields({ field: 'intheBox', value: Variant.intheBox }));
    dispatch(toggleProductFields({ field: 'manufacturerDetails', value: Variant.manufactureDetails }));
    dispatch(toggleProductFields({ field: 'minimumOrderQty', value: Variant.minimumOrderQty }));
    dispatch(toggleProductFields({ field: 'mrp', value: Variant.mrp }));
    dispatch(toggleProductFields({ field: 'packerDetails', value: Variant.packerDetails }));
    dispatch(toggleProductFields({ field: 'productDiscription', value: Variant.productDiscription }));
    dispatch(toggleProductFields({ field: 'ProcurementType', value: Variant.procurementType }));
    dispatch(toggleProductFields({ field: 'ProcurementSLA', value: Variant.procurementSLA }));
    dispatch(toggleProductFields({ field: 'color', value: Variant.colorId }));
    dispatch(toggleProductFields({ field: 'productTitle', value: Variant.productTitle }));
    dispatch(toggleProductFields({ field: 'sellingPrice', value: Variant.sellingPrice }));
    dispatch(toggleProductFields({ field: 'shippingProvider', value: Variant.shippingProvider }));
    dispatch(toggleProductFields({ field: 'taxCode', value: Variant.taxCode }));
    dispatch(toggleProductFields({ field: 'warantySummary', value: Variant.warantySummary }));
    dispatch(toggleProductFields({ field: 'warrantyPeriod', value: Variant.warrantyPeriod }));
    dispatch(toggleAddImage(Variant.photos));
    dispatch(toggleProductFields({ field: 'stock', value: Variant.stockqty }));
    dispatch(toggleProductFields({ field: 'sizebody', value: Variant.size }));
    dispatch(toggleProductFields({ field: 'sizeHeadId', value: Variant.sizeHeadId }));
    dispatch(toggleSearchKeyWordAdd(Variant.searchKeyWord));
 }

 // handle update the varaint /

const handleUpdateVaraint = () =>{
    const variantID = selectedVariant.ProductVariantId;
    updateProductVariant(variantID);

        handleKeyFeatures(variantID);
        handleSearchKeywords(variantID);
        handleImage(variantID);
        fetchedData.forEach((variant) => {
            variant.stockqty ? handleUpdateTheStock(variantID) : handleStock(variantID);
        });
        handleCreateSize(variantID);
        handleSpecifications(variantID);
        dispatch(toggleProductVaraintId(""));
        dispatch(toggleResetProductData());

        navigate("/Seller/AddNewProduct");
}


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
        fetchedData.forEach((variant) => {
            variant.stockqty ? handleUpdateTheStock(variantID) : handleStock(variantID);
        });
        handleCreateSize(variantID);
        handleSpecifications(variantID);
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
        fetchedData.forEach((variant) => {
            variant.stockqty ? handleUpdateTheStock(variantID) : handleStock(variantID);
        });

        handleCreateSize(variantID);
        handleSpecifications(variantID);

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
        fetchedData.forEach((variant) => {
            variant.stockqty ? handleUpdateTheStock(variantID) : handleStock(variantID);
        });
        handleCreateSize(variantID);
        handleSpecifications(variantID);
 
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
                {fetchedData.length > 0 && fetchedData.map((Varaint, index) => (
                    <div className={styles.variantBtn} onClick={()=>handleSelectVariant(Varaint)}>{index + 1}</div>
                ))}
                <div className={styles.btn} onClick={handleCreateAnotherVariant}>Create Another Variant</div>
                <div className={styles.btn} onClick={selectedVariant  ? handleUpdateVaraint :  handleSaveAndBack}>Save & Go Back</div>
                <div className={styles.btn} onClick={handleSendToQC} >Send to QC</div>
            </div>
        </div>
    )
}

export default ProductAddingSections