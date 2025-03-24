import React, { useEffect, useState } from 'react'
import styles from './Address.module.css'
import { IoMdAdd } from 'react-icons/io'
import PreviousAddress from './components/previousAddress/PreviousAddress'
import NewAddress from './components/addNewAddress/NewAddress'
import axios from 'axios'


interface fetchedUserData {
  _id?: string;
  userId?: string;
  address?: string;
  pincode?: string;
  createdAt?: string;
  city?: string;
  mobileNumber?: string;
  alternateMobileNumber?: string;
  fullName?: string;
  addressType?: string;
  districtName?: string;
  districtId?: string;
}


const Address: React.FC = () => {

  const [newAddress, setNewAddress] = useState<boolean>(false)
  const [fetchedUserAddress, setFetchedUserAddress] = useState<fetchedUserData[]>([]) // to store the fteched addres of the user
  const [hasChanges, sethasChanges] = useState<boolean>(false)// when we chnage any thing we also change the state 
  const [editAddressId, setEditAddressId] = useState<string>(""); // store the id which redy to edit
  const [editData, setEditData] = useState<fetchedUserData>({
    _id: "",
    userId: "",
    address: "",
    pincode: "",
    createdAt: "",
    city: "",
    mobileNumber: "",
    alternateMobileNumber: "",
    fullName: "",
    addressType: "",
    districtName: "",
    districtId: "",
  })
  const handleNewAddress = () => {
    setNewAddress((privious) => !privious)
  }


  const onEdit = async (_id: string) => {
    setEditAddressId(_id);
    handleNewAddress();

    try {
      const response = await axios.get(`http://localhost:5000/api/address/getAddress/${_id}`);
      console.log(response.data);
      setEditData(response.data.data);
    } catch (error: any) {
      console.error("fetching address details error", error);
    }
  }

  // useeffect for fetch the address of the user 


  useEffect(() => {
    const fetchUserAddresses = async () => {
      const userId = "67dbbcb0b24bfd96d2f74697"; // Single userId
      try {
        const response = await axios.get(`http://localhost:5000/api/address/getByUserId/${userId}`);
        console.log(response.data);
        setFetchedUserAddress(response.data.data); // Store in state if needed
      } catch (error) {
        console.error("Error fetching user addresses:", error);
      }
    };
    fetchUserAddresses();
  }, [hasChanges]);



  return (
    <div className={styles.body}>
      <div> <div className={styles.headName}>Manage Addresses</div>
        {newAddress ?
          <div className={styles.newAddress}>
            <NewAddress
              updateNewAddress={handleNewAddress}
              editData={editData}
              sethaschanges={sethasChanges}
            />
          </div>
          :
          <div className={styles.addAddressSection} onClick={handleNewAddress}>
            <div className={styles.plusIcon}><IoMdAdd /></div>
            <div className={styles.addMessage}>ADD A NEW ADDRESS</div>
          </div>}
      </div>
      <div className={styles.previousAddress}>
        {fetchedUserAddress.length > 0 &&
          fetchedUserAddress.map((addressdata, index) => (
            <PreviousAddress
              fetchedAddress={addressdata}
              index={index}
              sethaschanges={sethasChanges}
              onEdit={onEdit}
            />
          ))}

      </div>
    </div>
  )
}

export default Address