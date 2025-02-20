import React from 'react'
import styles from './InputBox.module.css'
import AttributeBox from '../attributeBox/AttributeBox'

interface InputBoxProps {
    headName: string;
    attributeName: string;
    inputContain: string;
}

const InputBox: React.FC<InputBoxProps> = ({ headName, attributeName,inputContain }) => {
    return (
        <div className={styles.body}>
          { headName === "" ? undefined :
           <div className={styles.headName}>{headName}</div>
          }
            <div className={styles.attributeSection}>
                <AttributeBox attributeName={attributeName} />
                <div className={styles.input}>
                    <input type="text" name='text' />
                </div>
                <div className={styles.inputContain}>
                    {inputContain}
                </div>
            </div>
        </div>
    )
}

export default InputBox