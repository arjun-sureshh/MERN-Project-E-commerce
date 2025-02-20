
import React from 'react'
import styles from './SideBar.module.css'
import YourActivites from './components/yourActivities/YourActivites'
import { FaHouseUser, FaParachuteBox } from 'react-icons/fa'
import { IoIosArrowForward } from 'react-icons/io'
import { ImNotification } from 'react-icons/im'
import { FiLogOut } from 'react-icons/fi'

const SideBar: React.FC = () => {
    return (
        <div className={styles.body}>
            <div className={styles.profileName}>
                ARJUN SURESH
            </div>
            <div className={styles.sideBody}>
                <div className={styles.ddd}>
                <YourActivites headName={"My Order"} subName={[]} icon={<FaParachuteBox/>} rightArrow={<IoIosArrowForward/>}/>
                <YourActivites  headName={"Account Settings"} subName={["Profile Name","Manage Addresses"]} icon={<FaHouseUser/>} rightArrow={null}/>
                <YourActivites  headName={"MY STUFF"} subName={["My Reviews & Ratings","All Notifications","My Wishlist"]} icon={<ImNotification/>} rightArrow={null}/>
                <YourActivites  headName={"Logout"} subName={[]} icon={<FiLogOut/>} rightArrow={null}/>
                </div>
            </div>
        </div>
    )
}

export default SideBar