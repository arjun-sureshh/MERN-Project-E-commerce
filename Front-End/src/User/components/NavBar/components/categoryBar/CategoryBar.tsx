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

    // Handle when mouse enters a category
    const handleMouseEnter = (index: number) => {
        if (index !== categories.length - 1) {
            setHoveredCategory(index);
            setPopupVisible(true);
        }
    };

    // Hide pop-up only when mouse leaves both the category and pop-up
    const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
            setHoveredCategory(null);
            setPopupVisible(false);
        }
    };

    return (
        <div 
            className={styles.categoryBar}
            onMouseLeave={handleMouseLeave} // Ensures pop-up disappears only when both are left
        >
            <div className={styles.categoryDropdown}>
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className={styles.categories}
                        onMouseEnter={() => handleMouseEnter(index)}
                    >
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

            {/* Display pop-up only if popupVisible is true */}
            {popupVisible && (
                <div 
                    className={styles.popUpSection}
                    onMouseEnter={() => setPopupVisible(true)} // Keep pop-up visible when hovered
                    onMouseLeave={handleMouseLeave} // Hide pop-up when mouse leaves
                >
                    <CategoryPopUp />
                </div>
            )}
        </div>
    );
};

export default CategoryBar;
