import Categories from '../categories/Categories'
import styles from './CategoryPopUp.module.css'

const CategoryPopUp:React.FC = () => {
    const categoriesArray = Array.from({ length: 8 });
  return (
    <div className={styles.body}>
      {categoriesArray.map((_, index) => (
      <Categories key={index} />
    ))}
    </div>
  )
}

export default CategoryPopUp