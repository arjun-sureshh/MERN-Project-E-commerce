import React from 'react'
import styles from './NavBar.module.css'
import { NavDropdown } from 'react-bootstrap'
import { IoLogOutOutline } from 'react-icons/io5'
import { Link } from 'react-router'

const NavBar: React.FC = () => {
    return (
        <div className={styles.body}>
            <div className={styles.section1}>
                <div className={styles.home}> <Link to={"/Seller"} style={{ textDecoration: "none", color: "inherit" }}> Home </Link></div>
                <div className={styles.listing}>
                    <NavDropdown title="Listing" id="basic-nav-dropdown">
                    <NavDropdown.Item> <Link to={"/Seller/Listing"} style={{ textDecoration: "none", color: "inherit" }}> My Listing</Link> </NavDropdown.Item>
                        <NavDropdown.Item>
                            <Link to={"/Seller/AddNewProduct"} style={{ textDecoration: "none", color: "inherit" }}>
                                Add New listing
                            </Link>
                        </NavDropdown.Item>
                        {/* <NavDropdown.Item >
                            <Link to={"/Seller/"} style={{ textDecoration: "none", color: "inherit" }}>
                                Track Approval Requests
                            </Link>
                        </NavDropdown.Item> */}
     
                    </NavDropdown>

                </div>
                <div className={styles.orders}>
                    <NavDropdown title="Orders" id="basic-nav-dropdown">
                        <NavDropdown.Item>Active Orders</NavDropdown.Item>
                        <NavDropdown.Item>
                            Returns
                        </NavDropdown.Item>
                        <NavDropdown.Item >Cancellation</NavDropdown.Item>
     
                    </NavDropdown>
                </div>
                <div className={styles.Payments}>
                    <NavDropdown title="Payments" id="basic-nav-dropdown">
                        <NavDropdown.Item >My Listing</NavDropdown.Item>
                        <NavDropdown.Item>
                            Add New listing
                        </NavDropdown.Item>
                        <NavDropdown.Item >Track Approval Requests</NavDropdown.Item>
                    </NavDropdown>
                </div>
            </div>
            <div className={styles.section2}>
                <div className={styles.logout}>
                    <span className={styles.logoutIcons}><IoLogOutOutline /></span>  Log out
                </div>
            </div>
        </div>
    )
}

export default NavBar