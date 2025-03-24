import React from 'react'
import styles from './HoverDown.module.css'
import { FaRegCircleUser } from 'react-icons/fa6'
import { LuBox } from 'react-icons/lu'
import { Link } from 'react-router'

const HoverDown:React.FC = () => {
  return (
    <div className={styles.body}>
     <div className={styles.signInUP}>
      <span className={styles.signIn}> <Link style={{textDecoration:"none",color: 'inherit'  }} to={'/User/Login'}>SignIn</Link></span>
       <span className={styles.signup}><Link style={{textDecoration:"none",color: 'inherit'  }} to={'/User/Registration'}> SignUp </Link></span>
       </div>
     <div className={styles.subBody}>
      <div className={styles.suboptions}><Link style={{textDecoration:"none",color: 'inherit'  }} to={'/User/MyAccount'}> <FaRegCircleUser/> My Profile </Link></div>
      <div className={styles.suboptions}><Link style={{textDecoration:"none",color: 'inherit'  }} to={'/User/MyAccount'}> <LuBox/> Orders </Link></div>
      {/* <div className={styles.suboptions}></div> */}

     </div>
    </div>
  )
}

export default HoverDown