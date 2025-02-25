import React, { useEffect, useState } from 'react'
import styles from './SelectBrand.module.css'
import { Box,  InputBase, MenuItem, Paper, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { toggleProductAddingState } from '../../../../../redux/toogleSlice';
import { RootState } from '../../../../../redux/store';


interface fetchData {
  brandName: string;
  _id: string;
}

const SelectBrand:React.FC = () => {

 const productId = useSelector((state: RootState) => state.toggle.productId)
 
  const dispatch = useDispatch();

  const [searchData, setSearchData] = useState<string>("");
  const [fetchData, setFetchData] = useState<fetchData[]>([]);
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null);
  const [selectedBrandName, setSelectedBrandName] = useState<string | null>(null);




   // Handle search input change and API call
   const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchData(value);
    // console.log(value);


    if (value.trim() === "") {
      setFetchData([]);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/brand/search/${value}`);
      setFetchData(response.data);
      console.log("fetchdata:",fetchData);
      console.log(e.currentTarget);

    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };


   // Handle category selection
   const handleSelect = (brand: fetchData) => {
    setSelectedBrandId(brand._id);
    setSelectedBrandName(brand.brandName)
    setSearchData(brand.brandName); // Update input field with selected category
    setFetchData([]); // Hide dropdown after selection
    
  };


  // add product submi
  const updateBrand = async () => {
    console.log(productId);
    console.log(selectedBrandId);
    
    
    if (!productId || !selectedBrandId) {
        alert("Missing productId or brandId");
        return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/product/brandId/${productId}`, { // ✅ Corrected URL
        brandId: selectedBrandId, // Ensure key matches backend expectations
    });

        // alert(response.data.message);
        dispatch(toggleProductAddingState(3));
    } catch (error) {
        console.error("Error updating brand:", error);
    }
};

  return (
    <Box className={styles.categoryContainer}>
    <Box className={styles.wrapper}>
      <Typography variant="h5" className={styles.title}>
      Check for the Brand you want to sell
      </Typography>
      <Typography variant="body1" className={styles.subTitle}>
        You can use the Search or Browse your brand 
      </Typography>
      <Box className={styles.searchBar}>
        <Paper
          component="form"
          sx={{
            p: "4px 8px",
            display: "flex",
            alignItems: "center",
            width: "100%",
            maxWidth: 500,
            borderRadius: "12px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            background: "#fff",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1, fontSize: "16px" }}
            placeholder="Search ..."
            inputProps={{ "aria-label": "search brand" }}
            value={searchData}
            onChange={handleChange}
          />
       
         
        </Paper>
        <Box className={styles.selectBrand}>
       {searchData === selectedBrandName ? <button className={styles.brandButton} type="button" onClick={updateBrand}>
          Add Product
        </button> :
        <button className={styles.brandButton} type="button">
          Check QC
        </button>}
      </Box>
      </Box>
      {fetchData.map((brand, index) => (
          <MenuItem key={index} onClick={() => handleSelect(brand)}>
            {brand.brandName}
          </MenuItem>
        ))}
      </Box>
     
      </Box>
  )
}

export default SelectBrand