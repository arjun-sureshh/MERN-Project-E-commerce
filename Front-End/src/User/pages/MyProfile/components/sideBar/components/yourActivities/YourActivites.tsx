import React from "react";
import styles from './YourActivites.module.css'
import { useDispatch } from "react-redux";
import { togglePageControlInUser } from "../../../../../../../redux/toogleSlice";
import { useNavigate } from "react-router";

interface YourActivitesProps {
    headName: string;
    subName: string[];
    icon: React.ReactNode;
    rightArrow: React.ReactNode;
}

const YourActivites: React.FC<YourActivitesProps> = ({ icon, headName, subName, rightArrow }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        sessionStorage.removeItem("user"); // Remove token from session storage
        navigate("/"); // Redirect to login page
    };
    return (
        <div className={`${styles.body} ${headName === "Logout" ? styles.disableBorder : ""}`}>
            <div className={styles.nameSection}>
                <div className={styles.icon}>{icon}</div>
                <div
                    className={styles.headName}
                    onClick={headName === "Logout" ? handleLogout : undefined}
                >
                    {headName} <span>{rightArrow}</span>
                </div>
            </div>
            {subName.length > 0 && <div className={styles.subBody}>
                {
                    subName.map((name, index) => (
                        <div className={styles.subNames} key={index} onClick={() => dispatch(togglePageControlInUser(name))}>{name}</div>
                    ))
                }

            </div>}

        </div>
    )
}

export default YourActivites