import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./AddSearchInput.module.css"; // CSS Module for styles
import { RootState } from "../../../../../../redux/store";
import { toggleSearchKeyWordAdd, toggleSearchKeyWordFieldRemove, toggleSearchKeyWordsUpdate } from "../../../../../../redux/toogleSlice";
import AttributeBox from "../attributeBox/AttributeBox";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";

interface InputBoxProps {
    headName?: string;
    attributeName: string;
    required?:string;
    
}

const SearchKeywordManager: React.FC<InputBoxProps> = ({ headName, attributeName, required }) => {
    const dispatch = useDispatch();
    const searchKeyWords = useSelector((state: RootState) => state.toggle.searchKeyWords);
    const [newKeyword, setNewKeyword] = useState("");
    const features = useSelector((state: RootState) => state.toggle.searchKeyWords);
        console.log(features);

    const handleAddKeyword = () => {
        if (newKeyword.trim() !== "") {
            dispatch(toggleSearchKeyWordAdd(newKeyword));
            setNewKeyword("");
        }
    };

    const handleUpdateKeyword = (index: number, value: string) => {
        dispatch(toggleSearchKeyWordsUpdate({ index, value }));
    };

console.log();

    return (
        <div className={styles.container}>
            {headName && <div className={styles.headName}>{headName}</div>}

            <div className={styles.attributeSection}>
                <AttributeBox attributeName={attributeName} requiredMust={required} />

                {/* Input Field for Adding New Keywords */}
                <div className={styles.inputsection}>


                    <div className={styles.inputContainer}>
                        <input
                            type="text"
                            placeholder="Enter search keyword"
                            value={newKeyword}
                            onChange={(e) => setNewKeyword(e.target.value)}
                            className={styles.input}
                        />
                        <button onClick={handleAddKeyword} className={styles.addButton}>
                           <GoPlus/>
                        </button>
                    </div>
                    <ul className={styles.list}>
                        {searchKeyWords.map((keyword, index) => (
                            <li key={index} className={styles.listItem}>
                                <input
                                    type="text"
                                    value={keyword.searchKeyWord}
                                    onChange={(e) => handleUpdateKeyword(index, e.target.value)}
                                    className={styles.input}
                                />
                                <button
                                    onClick={() => dispatch(toggleSearchKeyWordFieldRemove(index))}
                                    className={styles.deleteButton}
                                >
                                    <FiMinus/>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Display the List of Keywords */}

        </div>
    );
};

export default SearchKeywordManager;
