import { Route, Routes } from "react-router"
import UserApp from "../User/UserApp"
import SellerApp from "../Seller/SellerApp"
import HomePage from "../Home/HomePage"

import AdminApp from "../admin/AdminApp"
import AdminRegistration from "../admin/pages/adminRegistration/AdminRegistration"
import SellerDashBoard from "../Seller/sellerDashBoard/SellerDashBoard"
import SellerRegistration from "../Seller/pages/sellerRegistrationPage/SellerRegistration"

const Routers = () => {
  return (
    <div>
    <Routes>
    <Route path="/" element={<HomePage/>} />
      <Route path="/User/*" element={<UserApp/>} />
      <Route path="/Seller" element={<SellerApp/>} />
      <Route path="/Seller/*" element={<SellerDashBoard/>} />
      <Route path="/Seller/Registration"  element={<SellerRegistration/>}/>
      <Route path="/Admin/*" element={<AdminApp/>} />
      <Route path="/Admin/Registration" element={<AdminRegistration/>} />
      
    </Routes>
    </div>
  )
}

export default Routers