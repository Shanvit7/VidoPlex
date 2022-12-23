import styles from './stylesheets/home.module.css';
import TopNavbar from '../components/TopNavbar';
import SideNavbar from '../components/SideNavbar';
import {useRef} from 'react';
import {
    useDisclosure,
  } from '@chakra-ui/react'

const Home=()=>{
    const { isOpen,onClose,onOpen } = useDisclosure();
    const btnRef = useRef();

    return(
        <div className={styles.page}>
           <TopNavbar   passRef={btnRef}  openSideBar={onOpen}/>
           <SideNavbar passRef={btnRef} isOpenSidebar={isOpen} closeSidebar={onClose}/>
        </div>
    )
}

export default Home;