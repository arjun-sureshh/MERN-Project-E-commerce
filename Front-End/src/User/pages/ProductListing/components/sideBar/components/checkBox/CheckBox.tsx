import React, { useState } from "react"
import styles from './CheckBox.module.css'
import { FaChevronDown, FaChevronUp } from "react-icons/fa";


interface CheckBoxProps {
    headname: string;
    checkboxname: string[];
}



const CheckBox: React.FC<CheckBoxProps> = ({ headname, checkboxname }) => {
    const [buttonclick, setbuttonclick] = useState<boolean>(false)


    return (
        <div className={styles.body}>
            <div className={styles.headName} onClick={() => setbuttonclick((previous) => !previous)}>{headname} <span> {buttonclick ? <FaChevronUp/>:<FaChevronDown />} </span></div>
          
            { buttonclick && checkboxname.map((Name, index) => (
                <div className={styles.checkBoxContent}>
                    <div className={styles.checkBox}>
                        <input type="checkbox" name="checkbox" id="" />
                    </div>
                    <div className={styles.checkBoxName}
                        key={index}>
                        {Name}
                    </div>
                </div>
            ))}

        </div>
    )
}

export default CheckBox