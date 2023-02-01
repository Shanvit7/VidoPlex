import styles from './stylesheets/layout.module.css';
import { useMyWatchHistoryQuery } from '../redux/services/userService';
import TopNavbar from '../components/TopNavbar';
import SideNavbar from '../components/SideNavbar';
import { useRef,useState ,useEffect} from 'react';
import { Text,useDisclosure, Spinner, Box, SimpleGrid, Card,Image, Center} from '@chakra-ui/react';
import { useRouter } from 'next/router';

const WatchHistory=()=>{
    const {data:myWatchHistory={},error:myWatchHistoryError,isLoading:isMyWatchHistoryLoading} = useMyWatchHistoryQuery();
    const { isOpen,onClose,onOpen } = useDisclosure();
    const btnRef = useRef();
    const [isNoVideos,setIsNoVideos]=useState();
    const router= useRouter();
    useEffect(()=>{
    if(myWatchHistory)
     setIsNoVideos(myWatchHistory.data?.length===0); 
    })

    return(
        <div className={styles.page}>
            {
                isMyWatchHistoryLoading
                ?
                <Spinner color='#a742f5' size={'xl'} thickness={'5px'} speed={'0.30s'} />
                :
                myWatchHistoryError
                ?
                (<>
                  <TopNavbar  passRef={btnRef}  openSideBar={onOpen}/>
                  <SideNavbar passRef={btnRef} isOpenSidebar={isOpen} closeSidebar={onClose}/>
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
             {isNoVideos ? 'Start streaming now' :'My Watch History'}
            </Text>
            <SimpleGrid templateColumns={`repeat(4, 1fr)`} spacing={15} m='2%'>
            {
            isNoVideos ?
          (
          <Center>
           <Box
             m='2%'
             width={'100vw'}
             height={'50vh'}
             display={'flex'}
             justifyContent={'center'}
            >
             <img src='/watchlist.svg' />
            </Box>
          </Center>
          )
          :
          (
            myWatchHistory.data?.map((video,key)=>(
              <Box
               w={[null,'25','25','25','30']}
               h={[null,'70','60','60','60']}
              >
                 <Card
                  cursor={'pointer'}
                 >
                   <Image 
                     src={video?.thumbnail.url}
                     alt={'video'}
                     onClick={()=>{
                     router.push(`/watch/${video.id}`)
                 }}
                   />
                 </Card>
              </Box>)
             )
          )
     }
            </SimpleGrid>
            </>
            )
            }
        </div>
    )
}

export default WatchHistory;