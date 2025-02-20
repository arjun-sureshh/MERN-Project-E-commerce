import React from 'react'
import styles from './HoverDown.module.css'
import { FaRegCircleUser } from 'react-icons/fa6'
import { LuBox } from 'react-icons/lu'

const HoverDown:React.FC = () => {
  return (
    <div className={styles.body}>
     <div className={styles.signInUP}>
      <span className={styles.signIn}>SignIn</span>
       <span className={styles.signup}>SignUp</span>

       </div>
     <div className={styles.subBody}>
      <div className={styles.suboptions}> <FaRegCircleUser />My Profile</div>
      <div className={styles.suboptions}> <LuBox/>Orders</div>
      <div className={styles.suboptions}></div>

     </div>
    </div>
  )
}

export default HoverDown