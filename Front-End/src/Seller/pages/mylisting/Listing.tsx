import styles from './Listing.module.css'


import SubNav from './components/subNav/SubNav'
import Table from '../../components/table/Table'

const Listing:React.FC = () => {

    
   

  return (
    <div className={styles.body}>
        <div className={styles.subNav}>
           <SubNav addnewlisting={true}  subnavName={"My Listing"}/>
        </div>
        <div className={styles.updatesSection}>
        <div className={styles.updatesBoxs}>
        <div className={styles.borderradius}>
            <div className={styles.activeBox}>
                <div className={styles.boxSection1}>0</div>
                <div className={styles.boxSection2}>Active Listings</div>
            </div>
            <div className={styles.activeBox}>
                <div className={styles.boxSection1}>0</div>
                <div className={styles.boxSection2}>Ready For Activation</div>
            </div>
            <div className={styles.activeBox}>
                <div className={styles.boxSection1}>0</div>
                <div className={styles.boxSection2}>Blocked Listings</div>
            </div>
            <div className={styles.activeBox}>
                <div className={styles.boxSection1}>0</div>
                <div className={styles.boxSection2}>Inactive Listing</div>
            </div>
           </div>
            <div className={styles.activeBoxm}>
                <div className={styles.boxSection1}>0</div>
                <div className={styles.boxSection2}>Archived Listings</div>
            </div>
        </div>
        <div className={styles.productdetails}>
            <Table headnames={["Product Details","Listing Price","Final Price","Stock","Category","Fulfillment","Listing Quality","Additional Info","Action"]}/>
        </div>
        </div>
       
    </div>
  )
}

export default Listing