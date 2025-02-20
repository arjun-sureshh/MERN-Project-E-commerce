import React from 'react';
import styles from './BodyName.module.css'

interface BodyNameProps {
    headName: string;
    itemsNo: string;
    price: string;
}
const BodyName:React.FC<BodyNameProps> = ({headName, itemsNo , price}) => {
    return (
        <div className={styles.body}>
            <div className={styles.nameSection}>
                <div className={styles.name}>{headName}</div>
                {itemsNo && <div className={styles.itemNo}>({itemsNo}item)</div>}
            </div>
            <div className={ price=== "Free" ? `${styles.Free}`:`${styles.price}`}>{price === "Free" ? price :  ` ₹ ${price}`}</div> 
        </div>
    )
}

export default BodyName