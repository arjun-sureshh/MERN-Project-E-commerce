import React, { useEffect, useState } from 'react'
import styles from './AdminProfile.module.css'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { togglePageControl, toggleResetPage } from '../../../redux/toogleSlice';
import { IoIosArrowBack } from 'react-icons/io';

interface alldataProps {
  adminName: string;
  adminEmail: string;
  createdAt: string,
  _id: string,
}

const AdminProfile: React.FC = () => {


  const dispatch = useDispatch(); // dispatch method in redux
  const [alldata, setAlldata] = useState<alldataProps>({
    adminName:"",
    adminEmail:"",
    createdAt:"",
    _id:""
  }) // handle all fetch data
  const [id, setId] = useState<string>("67b437ba9acde33aace70f15") // store the id 
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null); // State for confirmation

// fetch data from the back end 
  const fetchData = async () => {
    if (!id) {
      throw new Error(" ID is required");
    }
    try {
      const response = await axios.get(`http://localhost:5000/api/admin/${id}`);
      const data = response.data.data;
      setAlldata(data)

    } catch (error) {
      console.error("Error Deleting admin account Detials:", error);
    }
  }

  // confirm Box for delete

  const confirmBox = () => {
    setConfirmDelete(id)
    console.log(confirmDelete);

  }
  // cancle the delete
  const cancelRequest = () => {
    setConfirmDelete("")
  }

  // delete the Brand 

  const deleteItem = async (_id: string) => {
    if (!_id) {
      throw new Error(" ID is required");
    }

    try {
      const response = await axios.delete(`http://localhost:5000/api/admin/${_id}`);

      // Remove  the deleted items for UI
      
      setConfirmDelete("");
    } catch (error) {
      console.error("Error Deleting Policy details:", error);
    }
  }


  // useeffect
  useEffect(() => {
    fetchData()
  }, [])


  return (
<div className={styles.profileContainer}>
  <div className={styles.homeLink}> <span onClick={() => dispatch(toggleResetPage())}><IoIosArrowBack/> Home</span></div>
  <div className={styles.profileCardCOntainer}>
      <div className={styles.profileCard}>
        <h2 className={styles.profileTitle}>Admin Profile</h2>

        {confirmDelete && (
          <div className={styles.overlay}>
            <div className={styles.modalBox}>
              <p>Are you sure you want to delete the account?</p>
              <div className={styles.btnRow}>
                <button className={styles.btnConfirm} onClick={() => deleteItem(confirmDelete)}>Confirm</button>
                <button className={styles.btnCancel} onClick={cancelRequest}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {alldata ? (
          <div className={styles.profileDetails}>
            <div className={styles.profileItem}><span>Name:</span> {alldata.adminName}</div>
            <div className={styles.profileItem}><span>Email:</span> {alldata.adminEmail}</div>
            <div className={styles.profileItem}><span>Join Date:</span> {alldata.createdAt}</div>
          </div>
        ) : (
          <p className={styles.loading}>Fetching admin data...</p>
        )}

        <div className={styles.profileActions}>
          <button className={styles.deleteBtn} onClick={confirmBox}>Delete Account</button>
          <div className={styles.actionGroup}>
            <button className={styles.changePasswordBtn} onClick={() => dispatch(togglePageControl("ChangePassword"))}>
              Change Password
            </button>
            <span className={styles.divider}>|</span>
            <button className={styles.editBtn} onClick={() => dispatch(togglePageControl("EditProfile"))}>
              Edit Profile
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default AdminProfile