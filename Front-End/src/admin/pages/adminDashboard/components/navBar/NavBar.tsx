import React, { useEffect, useRef, useState } from 'react'
import styles from './NavBar.module.css'
import { HiMenuAlt2 } from "react-icons/hi";
import { FaSearch } from 'react-icons/fa';
import { BsChat } from 'react-icons/bs';
import { IoNotificationsOffOutline } from 'react-icons/io5';
import { MdKeyboardArrowDown, MdModeNight } from 'react-icons/md';
import { CgProfile } from "react-icons/cg";
import { LiaSignOutAltSolid } from "react-icons/lia";
import Adminimg from '../../../../../assets/student.png'
import { useDispatch } from 'react-redux';
import { toggleMenuOpen, togglePageControl } from '../../../../../redux/toogleSlice';

const NavBar: React.FC = () => {


  const [handleAdminDrop, sethandleAdminDrop] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(containerRef.current?.contains);

    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        sethandleAdminDrop(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className={styles.body}>
      <div className={styles.navSections}>
        <div className={styles.menuIcon} onClick={() => dispatch(toggleMenuOpen())}><HiMenuAlt2 /></div>
        <div className={styles.searchbar}>
          <input type="text" placeholder='search here' />
          <button className={styles.searchIcon}><FaSearch /></button>
        </div>
      </div>
      <div className={styles.navSections2}>
        <div className={styles.chat}><BsChat /></div>
        <div className={styles.notification}><IoNotificationsOffOutline /></div>
        <div className={styles.nightmode}><MdModeNight /></div>
        <div ref={containerRef}>
          <div className={styles.profile} onClick={() => sethandleAdminDrop(!handleAdminDrop)}>
            <div className={styles.image}>
              <img src={Adminimg} alt="Admin image" />
            </div>
            <div className={styles.adminName}>Arjun <span><MdKeyboardArrowDown /></span></div>
          </div>
          {handleAdminDrop && <div className={styles.dropdown}>
            <div className={styles.listName} onClick={() => dispatch(togglePageControl("AdminProfile"))}><span className={styles.listIcon}><CgProfile /></span> Profile</div>
            <div className={styles.listName}><span className={styles.listIcon}><LiaSignOutAltSolid /></span>Sign Out</div>
          </div>}
        </div>
      </div>
    </div>
  )
}

export default NavBar