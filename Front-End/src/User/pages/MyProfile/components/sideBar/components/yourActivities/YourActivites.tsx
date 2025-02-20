import React from "react";
import styles from './YourActivites.module.css'

interface YourActivitesProps {
    headName: string;
    subName: string[];
    icon: React.ReactNode;
    rightArrow: React.ReactNode;
}

const YourActivites: React.FC<YourActivitesProps> = ({ icon, headName, subName, rightArrow }) => {
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
                        <div className={styles.subNames} key={index}>{name}</div>
                    ))
                }

            </div>}

        </div>
    )
}

export default YourActivites