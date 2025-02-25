import React from 'react'
import styles from './NavBar.module.css'
import { NavDropdown } from 'react-bootstrap'
import { IoLogOutOutline } from 'react-icons/io5'
import { Link } from 'react-router'

const NavBar: React.FC = () => {
    return (
        <div className={styles.body}>
            <div className={styles.section1}>
                <div className={styles.home}> <Link to={"/Seller"}> Home </Link></div>
                <div className={styles.listing}>
                    <NavDropdown title="Listing" id="basic-nav-dropdown">
                        <NavDropdown.Item> <Link to={"/Seller/Listing"}> My Listing </Link></NavDropdown.Item>
                        <NavDropdown.Item>
                            <Link to={"/Seller/AddNewProduct"}>
                                Add New listing
                            </Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item >
                            <Link to={"/Seller/"}>
                                Track Approval Requests
                            </Link>
                        </NavDropdown.Item>
                        {/* <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                            Separated link
                        </NavDropdown.Item> */}
                    </NavDropdown>

                </div>
                <div className={styles.orders}>
                    <NavDropdown title="Orders" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Active Orders</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                            Returns
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Cancellation</NavDropdown.Item>
                        {/* <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                            Separated link
                        </NavDropdown.Item> */}
                    </NavDropdown>
                </div>
                <div className={styles.Payments}>
                    <NavDropdown title="Payments" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">My Listing</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                            Add New listing
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Track Approval Requests</NavDropdown.Item>
                        {/* <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                            Separated link
                        </NavDropdown.Item> */}
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