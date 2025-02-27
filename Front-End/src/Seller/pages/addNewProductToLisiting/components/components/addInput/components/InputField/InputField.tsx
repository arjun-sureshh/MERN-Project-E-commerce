import React from 'react';
import styles from './InputField.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../../../../redux/store';
import { updateFeatureField } from '../../../../../../../../redux/toogleSlice';

interface InputFieldProps {
    index: number;
}

const InputField: React.FC<InputFieldProps> = ({ index }) => {
    const dispatch = useDispatch();
    const feature = useSelector((state: RootState) => state.toggle.features[index]); // Get only this input's data

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch(updateFeatureField({ index, key: name as "title" | "content", value }));
    };

    return (
        <div className={styles.container}>
            <div className={styles.inputTitle}>
                <input
                    type="text"
                    name="title"
                    value={feature?.title || ""}
                    onChange={handleChange}
                    placeholder="Key"
                />
            </div>
            <div className={styles.input}>
                <input
                    type="text"
                    name="content"
                    value={feature?.content || ""}
                    onChange={handleChange}
                    placeholder="Content"
                />
            </div>
        </div>
    );
};

export default InputField;
