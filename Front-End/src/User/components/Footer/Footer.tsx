import FeaturesHead from './components/FeaturesHead';
import styles from './Footer.module.css';

const Footer:React.FC = () => {
  return (
    <div className={styles.body}>
      <div className={styles.footerSection1}>
        <FeaturesHead/>
        <FeaturesHead/>
        <FeaturesHead/>
        <FeaturesHead/>
        <FeaturesHead/>
        <FeaturesHead/>
        <FeaturesHead/>

      </div>
      <div className={styles.footerSection2}> 
       <div className={styles.section2Name}>Become a seller</div>
       <div className={styles.section2Name}>Become a seller</div>
       <div className={styles.section2Name}>Become a seller</div>
       <div className={styles.section2Name}>Become a seller</div>
       <div className={styles.section2Name}>Become a seller</div>

      </div>
    </div>
  )
}

export default Footer