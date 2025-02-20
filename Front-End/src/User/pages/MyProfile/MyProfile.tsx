import React from "react";
import styles from './MyProfile.module.css'
import SideBar from "./components/sideBar/SideBar";
import ContentArea from "./components/contentArea/ContentArea";

const MyProfile:React.FC = () => {
    return(
        <div className={styles.body}>
           <div className={styles.sideBar}>
             <SideBar/>
            </div>
            <div className={styles.contentArea}>
                <ContentArea/>
            </div>
        </div>
    )
}
export default MyProfile