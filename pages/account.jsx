import styles from './stylesheets/layout.module.css';
import TopNavbar from '../components/TopNavbar';
import SideNavbar from '../components/SideNavbar';
import {useDisclosure,Text,Box,Icon, Button,} from '@chakra-ui/react';
import {FaUserCircle} from 'react-icons/fa';
import LogoutDialogBox from '../components/LogoutDialogBox';
import { useRef } from 'react';
const Account =()=>{
    const { isOpen,onClose,onOpen } = useDisclosure();
    const logOutModal = useDisclosure();
    const btnRef = useRef();

    return(
        <div className={styles.page}>
             <LogoutDialogBox 
             isOpenLogOutDialogBox={logOutModal.isOpen}
             closeLogOutDialogBox={logOutModal.onClose}
        />
             <TopNavbar  passRef={btnRef}  openSideBar={onOpen}/>
             <SideNavbar passRef={btnRef} isOpenSidebar={isOpen} closeSidebar={onClose}/>
             <Text textAlign={'center'} fontSize={'5xl'}>
                My Account
             </Text>

             <Box
             display={'flex'}
             justifyContent={'center'}
             w={'100%'}
             marginTop={'4%'}
             >

                <Box
                 backgroundColor={'#a742f5'}
                 w={'70vw'}
                 h={'70vh'}
                 display={'flex'}
                 flexDirection={'column'}
                 justifyContent={'center'}
                 alignItems={'center'}
                >
                    <Box 
                    border={'1px solid white'}
                    w={'68vw'}
                    h={'68vh'}
                  
                    >
                        <Box
                          display={'flex'}
                          flexDirection={'column'}
                          justifyContent={'center'}
                          alignItems={'center'}
                        >

                        <Icon
                        as={FaUserCircle}
                        color={'white'}
                        boxSize={20}
                        marginTop={'2%'}
                        />

                        <Text
                        color={'white'}
                        marginTop={'2%'}
                        fontSize={'4xl'}
                        >
                            Testing 555
                        </Text>

                        <Text
                        color={'white'}
                        marginTop={'1%'}
                        fontSize={'1xl'}
                        fontStyle={'italic'}
                        >
                            Plan valid upto 26 Feb 2023
                        </Text>

                        </Box>

                        <Box
                        w={'100%'}
                        display={'flex'}
                        justifyContent={'space-around'}
                        height={['15vh',null]}
                        marginTop={'5%'}
                        flexDirection={['column','row']}
                        alignItems={['center',null]}
                        >
                            <Button
                            w={['80%','40%']}
                            >
                              Change Password
                            </Button>

                            <Button
                             w={['80%','40%']}
                             onClick={logOutModal.onOpen}
                            >
                              Logout
                            </Button>
                        </Box>
                    
                    </Box>
                </Box>

             </Box>
        </div>
    )
}


export default Account;