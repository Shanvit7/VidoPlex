import {useRef} from'react';
import styles from './stylesheets/layout.module.css';
import SideNavbar from '../components/SideNavbar';
import TopNavbar from '../components/TopNavbar';
import { Text , useDisclosure, Spinner, Box} from '@chakra-ui/react';
import { useMyWatchListQuery} from '../redux/services/userService';

const WatchList=()=>{
    const { isOpen,onClose,onOpen } = useDisclosure();
    const btnRef = useRef();
    const {data,error,isLoading} = useMyWatchListQuery();
    return(
        <div className={styles.watchlist_page}>
            {
                isLoading
                ?
                <Spinner color='#a742f5' size={'xl'} thickness={'5px'} speed={'0.30s'} />
                :
                error
                ?
                (<>
                    <Text
                    textAlign={'center'}
                    fontSize={'6xl'}
                    >Something went wrong. Please try again later
                    </Text>
                    <Box
                    m='2%'
                    width={'100vw'}
                    height={'80vh'}
                    display={'flex'}
                    justifyContent={'center'}
                    >
                     <img src='/error.svg' />
                    </Box>
                    </>
                    )
                :
                (
            <>
           <TopNavbar  passRef={btnRef}  openSideBar={onOpen}/>
           <SideNavbar passRef={btnRef} isOpenSidebar={isOpen} closeSidebar={onClose}/>
            <Text 
             textAlign={'center'}
             fontSize={'5xl'}
              marginTop='1%'
            >
             My Watchlist
            </Text>
            </>
            )
            }
        </div>
    )
}


export default WatchList;