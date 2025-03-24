import React from "react";
import styles from "./ContentArea.module.css";
import TopSmallBox from "../smallBox/TopSmallBox";
import { PiPulseLight, PiShoppingBagOpenDuotone } from "react-icons/pi";
import { BsCart2 } from "react-icons/bs";
import TopSellingProducts from "../topSellingProducts/TopSellingProducts";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store";
import District from "../../../district/District";
import Category from "../../../category/Category";
import Color from "../../../color/Color";
import Brand from "../../../brand/Brand";
import PaymentMethod from "../../../paymentMethod/PaymentMethod";
import PolicyMethod from "../../../policyMethos/PolicyMethod";
import AdminProfile from "../../../adminProfile/AdminProfile";
import AdminEditProfile from "../../../adminEditProfile/AdminEditProfile";
import AdminChangePassword from "../../../adminchangePassword/AdminChangePassword";
import SizeType from "../../../sizeType/SizeType";
import SellerQC from "../../../qcSection/sellerQC/SellerQC";
import ApprovedSellers from "../../../approved/approvedSellers/ApprovedSellers";
import RejectedSellers from "../../../rejected/rejectedSeller/RejectedSeller";
import ProductQC from "../../../qcSection/productQC/ProductQC";
import ApprovedProduct from "../../../approved/approvedProducts/ApprovedProducts";
import RejectedProduct from "../../../rejected/rejectedProduct/RejectedProduct";

// ✅ Define the Product interface
interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  seller: string;
  orders: number;
  status: "InProgress" | "Paused" | "Cancelled"; // Correct type
}

const productData: Product[] = [
    {
      id: 1,
      name: "Aurora",
      category: "UI Kit",
      image: "/images/aurora.png",
      seller: "Gantos",
      orders: 520,
      status: "InProgress",
    },
    {
      id: 2,
      name: "Bender",
      category: "Dashboard",
      image: "/images/bender.png",
      seller: "Adray Transportation",
      orders: 240,
      status: "Paused",
    },
    {
      id: 3,
      name: "Edison",
      category: "UI Kit",
      image: "/images/edison.png",
      seller: "Monsource Investment Group",
      orders: 410,
      status: "Cancelled",
    },
];

const ContentArea: React.FC = () => {

  const openPage = useSelector((state: RootState) => state.toggle.openPage || {}); // ✅ Ensure it’s never undefined



 
  return (
    <div className={styles.body}>
    
      {openPage["District"] ? 
      <div className={styles.renderComponent}>
        <District/> 
      </div>
     
      : openPage["Categories"] ?
      <div className={styles.renderComponent}>
      <Category/>
      </div>
      : openPage["Color"] ?
      <div className={styles.renderComponent}>
      <Color/> 
      </div>
      : openPage['Brand'] ? 
      <div className={styles.renderComponent}>
      <Brand/>
      </div> 
      : openPage['Payment']?
      <div className={styles.renderComponent}>
      <PaymentMethod/>
      </div> 
      : openPage['Policy']?
      <div className={styles.renderComponent}>
      <PolicyMethod/>
      </div> 
      : openPage['AdminProfile']?
      <div className={styles.renderComponent}>
      <AdminProfile/>
      </div> 
      : openPage['EditProfile']?
      <div className={styles.renderComponent}>
      <AdminEditProfile/>
      </div> 
      : openPage['ChangePassword']?
      <div className={styles.renderComponent}>
      <AdminChangePassword/>
      </div> 
      : openPage['Size']?
      <div className={styles.renderComponent}>
      <SizeType/>
      </div> 
      :  openPage['SellerQC']?
      <div className={styles.renderComponent}>
      <SellerQC/>
      </div> 
      : openPage['ApprovedSeller']?
      <div className={styles.renderComponent}>
      <ApprovedSellers/>
      </div> 
      : openPage['RejectedSeller']?
      <div className={styles.renderComponent}>
      <RejectedSellers/>
      </div> 
      : openPage['ProductQC']?
      <div className={styles.renderComponent}>
      <ProductQC/>
      </div> 
      : openPage['ApprovedProducts']?
      <div className={styles.renderComponent}>
      <ApprovedProduct/>
      </div> 
      : openPage['RejectedProducts']?
      <div className={styles.renderComponent}>
      <RejectedProduct/>
      </div> 
      :

        <><div className={styles.container}>
          <TopSmallBox
            title="Income"
            price="$37.500"
            per="6.25%"
            message="Since last week"
            Icon={PiShoppingBagOpenDuotone} />
          <TopSmallBox
            title="Orders"
            price="3.282"
            per="-4.65%"
            message="Since last week"
            Icon={BsCart2} />
          <TopSmallBox
            title="Activity"
            price="19.312"
            per="8.35%"
            message="Since last week"
            Icon={PiPulseLight} />
        </div><div className={styles.topSelllingProducts}>
            <TopSellingProducts products={productData} />
          </div></>
       } 


    </div>
  );
};

export default ContentArea;
