import { Route, Routes } from "react-router"
import ProductListing from "../pages/ProductListing/ProductListing"
import ProductView from "../pages/ProductDetails/ProductView"
import Cart from "../pages/Cart/Cart"
import MyProfile from "../pages/MyProfile/MyProfile"
import Home from "../pages/Home/Home"

const UserRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/"  element={<Home/>}/>
        <Route path="/ProductView" element={<ProductView />} />
        <Route path="/ProductListing" element={<ProductListing />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/MyAccount" element={<MyProfile />} />
      </Routes>
    </div>
  )
}

export default UserRoutes