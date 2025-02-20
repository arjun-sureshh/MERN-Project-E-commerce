import React from 'react'
import styles from './Inventory.module.css'
import Path from '../../../components/path/Path'
import Table from '../../components/table/Table'

const Inventory: React.FC = () => {
    return (
        <div className={styles.body}>
            <div className={styles.headSection}>
                <div className={styles.titleSec}>
                    <Path />
                    <div className={styles.title}>Inventory</div>
                </div>
                <div className={styles.btnSec}>
                    <div className={styles.btns}>
                        <div className={styles.btnblock}>
                            <div className={styles.btn}>
                                <div className={styles.inbtn1}>All Inventory</div>
                                <div className={styles.inbtn2}>0</div>
                            </div>
                            <div className={styles.btn}>
                                <div className={styles.inbtn1}>Low Stock</div>
                                <div className={styles.inbtn2}>0</div>
                            </div>
                            <div className={styles.btn}>
                                <div className={styles.inbtn1}>Out Of Stock</div>
                                <div className={styles.inbtn2}>0</div>
                            </div>
                        </div>
                        {/* <div className={styles.singlebtn}>
                            <div className={styles.btn}>
                                <div className={styles.inbtn1}>Recommendations</div>
                                <div className={styles.inbtn2}></div>
                            </div>
                        </div> */}
                    </div>
                </div>

            </div>

            <div className={styles.productdetailSec}>
                <Table headnames={["Product Information","Current stock","Sale Rate / Day"]}/>
            </div>
        </div>
    )
}

export default Inventory