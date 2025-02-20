import styles from './CategoryBar.module.css'
import { useState } from "react"
import CategoryPopUp from "./components/PopUp/CategoryPopUp"
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md"

const CategoryBar: React.FC = () => {
    const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
    const [popupVisible, setPopupVisible] = useState<boolean>(false);

    const categories = [
        "Electronics",
        "TVs & Appliances",
        "Men",
        "Women",
        "Baby & Kids",
        "Home & Furniture",
        "Sports, Books & More",
        "Offer Zone" // Last category
    ];

    // Handle when the mouse enters a category
    const handleMouseEnter = (index: number) => {
        if (index !== categories.length - 1) {
            setHoveredCategory(index);
           
        }
    };

    const handleMouseLeave = () => {
        setHoveredCategory(null);

    };
    //   const blockvisible = hoveredCategory !== null && popupVisible
    return (
        <div>
            {/* Category Bar */}
            <div className={styles.categoryBar}>
                <div className={styles.categoryDropdown}>
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className={styles.categories}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}>
                            {category}
                            {index !== categories.length - 1 && (
                                hoveredCategory === index ? (
                                    <MdKeyboardArrowUp />
                                ) : (
                                    <MdKeyboardArrowDown />
                                )
                            )}
                           
                        </div>
                        
                    ))}
                </div>
                {hoveredCategory && <div
                                className={styles.popUpSection}>
                                <CategoryPopUp />
                            </div>}
               

            </div>


        </div>
    );
};

export default CategoryBar;
