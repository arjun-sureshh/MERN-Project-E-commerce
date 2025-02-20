import React from 'react'
import styles from './Table.module.css'

interface TableProps{
  headnames:string[];
}

const Table: React.FC<TableProps> = ({headnames}) => {
  return (
    <div className={styles.body}>
     <table>
      <thead>
        <tr className={styles.head}>
          <th>0</th>
          {
            headnames.map((names,index) =>(
              <th>{names}</th>
            ))
            }


          {/* <th>Listing Price</th>
          <th>Final Price</th>
          <th>Stock</th>
          <th>Category</th>
          <th>Fulfillment</th>
          <th>Listing Quality</th>
          <th>Additional Info</th>
          <th>Action</th> */}
        </tr>
      </thead>
      <tr className={styles.details}>
        <th>1</th>
       {
        headnames.map((names,index) =>(

          <th>222</th>
        ))
        }


        {/* <th>fdds</th>
        <th>vds</th>
        <th>sdv</th>
        <th>dsv</th>
        <th>dsvsd</th>
        <th>sds</th>
        <th>dsvds</th>
        <th>delete</th> */}
      </tr>
     </table>
    </div>
  )
}

export default Table