import React from 'react'
import styles from './SelectBox.module.css'
import AttributeBox from '../attributeBox/AttributeBox';

interface SelectBoxProps {
    headName: string;
    attributeName: string;
    inputContain: string[];
}

const SelectBox: React.FC<SelectBoxProps> = ({headName,attributeName,inputContain}) => {
    return (
        <div className={styles.body}>
            <div className={styles.headName}>{headName}</div>
            <div className={styles.attributeSection}>
                <AttributeBox attributeName={attributeName} />
                <div className={styles.select}>
                    <select id="select" name="select">
                        <option >Select One</option>
                        {inputContain.map((options,index) =>(
                            <option value={options} key={index}>{options}</option>
                        ))
                        }
                    </select>
                </div>
                <div className={styles.inputContain}>
                    {}
                </div>
            </div>
        </div>
    )
}

export default SelectBox