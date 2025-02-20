import React, { useState } from 'react'
import styles from './Address.module.css'
import { IoMdAdd } from 'react-icons/io'
import PreviousAddress from './components/previousAddress/PreviousAddress'
import NewAddress from './components/addNewAddress/NewAddress'

const Address: React.FC = () => {

  const [newAddress, setNewAddress] = useState<boolean>(false)
 
  const handleNewAddress = () =>{
    setNewAddress((privious)=> !privious)
  }

  return (
    <div className={styles.body}>
      <div> <div className={styles.headName}>Manage Addresses</div>
        {newAddress ?
          <div className={styles.newAddress}>
            <NewAddress updateNewAddress={handleNewAddress} />
          </div>
          :
          <div className={styles.addAddressSection} onClick={handleNewAddress}>
            <div className={styles.plusIcon}><IoMdAdd /></div>
            <div className={styles.addMessage}>ADD A NEW ADDRESS</div>
          </div>}
      </div>
      <div className={styles.previousAddress}>
        <PreviousAddress home={"HOME"}
          fullName={"Arjun Suresh"}
          mobileNO={8606687344}
          fullAddress={"marambillikudy(h), munnippara, Aruvappara (p.o), kombanad, Kunnathunad Subdistrict, Ernakulam District, Kerala"}
          pinNO={683546} />
        <PreviousAddress home={"HOME"}
          fullName={"Arjun Suresh"}
          mobileNO={8606687344}
          fullAddress={"marambillikudy(h), munnippara, Aruvappara (p.o), kombanad, Kunnathunad Subdistrict, Ernakulam District, Kerala"}
          pinNO={683546} />
      </div>
    </div>
  )
}

export default Address