
import CheckBox from './components/checkBox/CheckBox'
import PriceSlider from './components/price/PriceSlider'
import styles from './SideBar.module.css'

const SideBar: React.FC = () => {
  return (
    <div className={styles.body}>
    <div className={styles.sideBarsection}>Categories</div>
    <div className={styles.sideBarsection}>
    <CheckBox headname="Brand" checkboxname={["ADIDAS", "Puma"]} />
      </div> 
    <div className={styles.sideBarsection}>
      <PriceSlider/>
      </div>  
    <div className={styles.sideBarsection}>
    <CheckBox headname="Gender" checkboxname={["Men", "Women"]} />
      </div><div className={styles.sideBarsection}>
    <CheckBox headname="Discount" checkboxname={[ "30% or more", "40% or more","50% or more","60% or more" ,"70% or more"   ]} />
      </div> 
    </div>
  )
}

export default SideBar