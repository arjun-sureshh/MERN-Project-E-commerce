import React from "react";
import styles from './YourActivites.module.css'
import { useDispatch } from "react-redux";
import { togglePageControlInUser } from "../../../../../../../redux/toogleSlice";

interface YourActivitesProps {
    headName: string;
    subName: string[];
    icon: React.ReactNode;
    rightArrow: React.ReactNode;
}

const YourActivites: React.FC<YourActivitesProps> = ({ icon, headName, subName, rightArrow }) => {

    const dispatch = useDispatch();

    return (
        <div className={`${styles.body} ${headName === "Logout" ? styles.disableBorder : ""}`}>
            <div className={styles.nameSection}>
                <div className={styles.icon}>{icon}</div>
                <div className={styles.headName}>{headName} <span>{rightArrow}</span>
                </div>
            </div>
            { subName.length > 0 && <div className={styles.subBody}>
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