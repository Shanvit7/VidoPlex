import {useRef,useState,useEffect} from'react';
import styles from './stylesheets/layout.module.css';
import SideNavbar from '../components/SideNavbar';
import TopNavbar from '../components/TopNavbar';
import { Text,useDisclosure, Spinner, Box, SimpleGrid, Card,Image, Center} from '@chakra-ui/react';
import { useMyWatchListQuery } from '../redux/services/userService';
import { useRouter } from 'next/router';

const WatchList=()=>{
    const { isOpen,onClose,onOpen } = useDisclosure();
    const btnRef = useRef();
    const {data:watchlistVideos={},error:watchlistError,isLoading:isWatchlistLoading} = useMyWatchListQuery();
    const [isNoVideos,setIsNoVideos]=useState();
    const router= useRouter();
    useEffect(()=>{
    if(watchlistVideos)
     setIsNoVideos(watchlistVideos.data?.length===0); 
    })
    return(
        <div className={styles.page}>
            {
                isWatchlistLoading
                ?
                <Spinner color='#a742f5' size={'xl'} thickness={'5px'} speed={'0.30s'} />
                :
                watchlistError
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
             fontSize={['3xl','4xl','5xl']}
             marginTop='1%'
            >
             {isNoVideos ? 'No videos found. Add videos to stream later' :'My Watchlist'}
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
            watchlistVideos.data?.map((video,key)=>(
              <Box
               w={[null,'25','25','25','30']}
               h={[null,'70','60','60','60']}
               m={['0',null,null,'2']}
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


export default WatchList;