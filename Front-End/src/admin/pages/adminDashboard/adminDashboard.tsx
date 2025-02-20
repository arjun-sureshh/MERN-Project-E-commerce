import React from 'react'
import styles from './adminDashboard.module.css'
import NavBar from './components/navBar/NavBar'
import ContentArea from './components/contentArea/ContentArea'
import Sidebar from './components/sideBar/SideBar'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'

const AdminDashboard:React.FC = () => {

  const menuOpen = useSelector((state:RootState) => state.toggle.menuOpen )

  return(
    <div className={styles.wrapper}>
     { menuOpen && <div className={styles.sideBar}>
      <Sidebar/>
      </div>}
        <div className={styles.container}>
        <NavBar/>
        <ContentArea/>
        </div>
    </div>
  )
}

export default AdminDashboard