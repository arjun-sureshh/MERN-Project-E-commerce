import React, { useEffect, useState } from "react";
import styles from './MyProfile.module.css'
import SideBar from "./components/sideBar/SideBar";
import ContentArea from "./components/contentArea/ContentArea";
import axios from "axios";

interface fetchedUserData{
    _id:string;
    userName:string;
    userMobileNumber:string;
    userEmail:string;
    createdAt:string;
    userGender?:string;
}

const MyProfile: React.FC = () => {

    const [fetchedUserData, setFetchedUserData] = useState<fetchedUserData | null>(null)

    useEffect(() => {
        const fetchedUser = async () => {
            const UserId = "67dbbcb0b24bfd96d2f74697"
            try {
                const response = await axios.get(`http://localhost:5000/api/user/FetchDataByUserId/${UserId}`);
                console.log(response.data);
                setFetchedUserData(response.data.data);
            } catch (error: any) {
                console.error("Error fetching user data:", error);
            }
        }
        fetchedUser();
    }, [])


    return (
        <div className={styles.body}>
            <div className={styles.sideBar}>
                <SideBar userName={fetchedUserData?.userName}/>
            </div>
            <div className={styles.contentArea}>
                <ContentArea userData={fetchedUserData}/>
            </div>
        </div>
    )
}
export default MyProfile