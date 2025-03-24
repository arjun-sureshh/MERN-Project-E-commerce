import React, { useState } from 'react'
import styles from './SideBar.module.css'
import { FaCogs, FaIndustry, FaShoppingCart, FaUsers } from 'react-icons/fa'
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { MdProductionQuantityLimits } from 'react-icons/md';
import { useDispatch} from 'react-redux';
// import { RootState } from '../../../../../redux/store';
import { togglePageControl, toggleResetPage } from '../../../../../redux/toogleSlice';

const SideBar: React.FC = () => {

    const dispatch = useDispatch();
    // useSelector((state: RootState) => state.toggle)

    const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});

    const toggleMenu = (title: string) => {
        setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] }));
    };

    return (
        <div className={styles.body}>
            <div className={styles.title} onClick={() => dispatch(toggleResetPage())}>
                <div className={styles.webIcon}> <FaIndustry /></div>
                <div className={styles.webName}>Stack App</div>
            </div>
            <div className={styles.container}>
                <div className={styles.dropDownlist}>
                    <ul className={styles.menu}>
                        {/* QC Department */}
                        <li>
                            <div className={styles.menu_item} onClick={() => toggleMenu("QC Department")}>
                                <span className={styles.icon}>
                                    <FaCogs />
                                </span>
                                QC Department
                                <span className={styles.dropdown_icon}>
                                    {openMenus["QC Department"] ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                                </span>
                            </div>
                            {openMenus["QC Department"] && (
                                <ul className={styles.subMenu}>
                                    <li>
                                        <span onClick={() =>dispatch(togglePageControl("SellerQC"))}>Seller QC</span>
                                    </li>
                                    <li>
                                        <span onClick={() =>dispatch(togglePageControl("ProductQC"))}>Product QC</span>
                                    </li>
                                </ul>
                            )}
                        </li>
                        {/* seller */}
                        <li>
                            <div className={styles.menu_item} onClick={() => toggleMenu("Seller")}>
                                <span className={styles.icon}>
                                    <FaShoppingCart />
                                </span>
                                Seller
                                <span className={styles.dropdown_icon}>
                                    {openMenus["Seller"] ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                                </span>
                            </div>
                            {openMenus["Seller"] && (
                                <ul className={styles.subMenu}>
                                    <li>
                                        <span onClick={() => dispatch(togglePageControl("ApprovedSeller"))}>Active Seller</span>
                                    </li>
                                    <li>
                                        <span onClick={() => dispatch(togglePageControl("RejectedSeller"))}>Cancelled Seller</span>
                                    </li>
                                </ul>
                            )}
                        </li>
                        {/* Product */}
                        <li>
                            <div className={styles.menu_item} onClick={() => toggleMenu("Product")}>
                                <span className={styles.icon}>
                                <MdProductionQuantityLimits/>
                                </span>
                                Product
                                <span className={styles.dropdown_icon}>
                                    {openMenus["Product"] ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                                </span>
                            </div>
                            {openMenus["Product"] && (
                                <ul className={styles.subMenu}>
                                    <li>
                                        <span onClick={() => dispatch(togglePageControl("ApprovedProducts"))}>Active Product</span>
                                    </li>
                                    <li>
                                        <span onClick={() => dispatch(togglePageControl("RejectedProducts"))}>Cancelled Product</span>
                                    </li>
                                </ul>
                            )}
                        </li>
                        {/* Customers */}
                        <li className={styles.menu_item}>
                            <span className={styles.icon}>
                                <FaUsers />
                            </span>
                            Customers
                        </li>
                        {/* district */}
                        <li className={styles.menu_item} onClick={() =>dispatch(togglePageControl("District"))}>
                            District
                        </li>
                        {/* Categories */}
                        <li className={styles.menu_item} onClick={() =>dispatch(togglePageControl("Categories"))}>
                            Categories
                        </li>
                        {/* color */}
                        <li className={styles.menu_item} onClick={() =>dispatch(togglePageControl("Color"))}>
                            Colours
                        </li>
                        {/* Brand */}
                        <li className={styles.menu_item} onClick={() =>dispatch(togglePageControl("Brand"))}>
                            Brand
                        </li>
                        <li className={styles.menu_item} onClick={() =>dispatch(togglePageControl("Size"))}>
                            Size
                        </li>
                        

                        {/* Policies */}
                        <li>
                            <div className={styles.menu_item} onClick={() => toggleMenu("Policy")}>
                                <span className={styles.icon}>
                                    <FaCogs />
                                </span>
                                Policy
                                <span className={styles.dropdown_icon}>
                                    {openMenus["Policy"] ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                                </span>
                            </div>
                            {openMenus["Policy"] && (
                                <ul className={styles.subMenu}>
                                    <li>
                                        <span onClick={() => dispatch(togglePageControl("Payment"))}>Payment Policy</span>
                                        
                                    </li>
                                    <li>
                                        <span onClick={() => dispatch(togglePageControl("Policy"))}>Policy Methods</span>
                                        
                                    </li>
                                </ul>
                            )}
                        </li>


                    </ul>


                </div>
            </div>
        </div>
    )
}

export default SideBar

