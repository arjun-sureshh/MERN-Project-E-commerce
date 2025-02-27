import React from 'react';
import styles from './SelectBox.module.css';
import AttributeBox from '../attributeBox/AttributeBox';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/store';
import {  toggleProductFields} from '../../../../../../redux/toogleSlice';

interface SelectBoxProps {
  headName?: string; // Made optional for flexibility
  attributeName: string // Ensures type safety
  inputContain?: string[]; // Made optional
  name:keyof RootState['toggle']['productFields'];
}

const SelectBox: React.FC<SelectBoxProps> = ({ headName, attributeName, inputContain = [] , name }) => {
  const dispatch = useDispatch();
  
  // Retrieve the current value from Redux state
  const value = useSelector(
    (state: RootState) => state.toggle.productFields[name]
  );

  // Handler to update Redux state when the select value changes
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(toggleProductFields({ field: name, value: e.target.value }));
  };

  return (
    <div className={styles.body}>
      {headName && <div className={styles.headName}>{headName}</div>}
      <div className={styles.attributeSection}>
        <AttributeBox attributeName={attributeName} />
        <div className={styles.select}>
          <select
            name={name}
            value={value} // controlled select value from Redux
            onChange={handleChange}
          >
            <option value="">Select One</option>
            {inputContain.map((option, index) => (
              <option value={option} key={index}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SelectBox;
