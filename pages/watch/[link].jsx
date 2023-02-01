import styles from '../stylesheets/layout.module.css';
import { Flex,Box,Button, Icon,Text,Spinner,useToast,Tooltip, useDisclosure} from '@chakra-ui/react';
import {FaTv,FaBan}  from 'react-icons/fa';
import {AiFillLike,AiFillPlayCircle,AiOutlineLike} from 'react-icons/ai';
import { useRouter } from 'next/router';
import { useGetVideoQuery } from '../../redux/services/videoService';
import { 
  useAddToWatchListMutation,
  useMyWatchListQuery,
  useRemoveFromWatchListMutation,
  useLikeTheTitleMutation,
  useLikedTitlesQuery,
  useRemoveFromLikedMutation,
  useUpdateMyWatchHistoryMutation
} from '../../redux/services/userService';
import { useState,useEffect,useRef} from 'react';
import TopNavbar from '../../components/TopNavbar';
import SideNavbar from '../../components/SideNavbar';

const StreamTitle=()=>{
    const router = useRouter();
    const toast = useToast();
    const { isOpen,onClose,onOpen } = useDisclosure();
    const btnRef = useRef();
    const {data:watchlist={},refetch:refetchWatchlist} = useMyWatchListQuery();
    const {data:likedTitles={},refetch:refetchLikedTitles}= useLikedTitlesQuery();
    const {data:video,error,isLoading} = useGetVideoQuery(router.query.link);
    const [addToWatchlist,{ isLoading: isWatchlistUpdating }] = useAddToWatchListMutation();
    const [removeFromLiked] = useRemoveFromLikedMutation();
    const [removeFromWatchList]=useRemoveFromWatchListMutation();
    const [likeTheTitle,{isLoading:isLikeUpdating}]= useLikeTheTitleMutation();
    const [updateMyWatchHistory]=useUpdateMyWatchHistoryMutation();
    const [isOnWatchList,setIsOnWatchList] = useState();
    const [isAlreadyLiked,setIsAlreadyLiked]=useState();
    

    useEffect(()=>{
      if(watchlist)
       setIsOnWatchList(watchlist.data?.some((video)=>{
        return video.id===router?.query?.link
       }))
    });

    useEffect(()=>{
      if(likedTitles)
      setIsAlreadyLiked(likedTitles.data?.some((video)=>{
        return video.id===router?.query?.link
       }))
    });


    const likeTheCurrentTitle=async(titleName)=>{
      likeTheTitle(video)
      .unwrap()
      .then((data)=>{
       if(data?.result==='success'){
           toast({
               title: `You have liked "${titleName}"`,
               position:'top-right',
               status: 'success',
               duration: 1500,
               isClosable: true,
             })
            refetchLikedTitles();
       } else{
           toast({
               title: 'Something went wrong',
               description:'Please try again later',
               position:'top-right',
               status: 'error',
               duration: 1500,
               isClosable: true,
             })
       }
    }).catch((err) => {
       console.log(err);
       toast({
         title: 'Sorry',
         description:err.message,
         position:'top-right',
         status: 'error',
         duration: 1500,
         isClosable: true,
       })
     })

    }

    const removeFromLikedTitles=async(titleName)=>{
      removeFromLiked(router?.query?.link)
      .unwrap()
      .then((data)=>{
       if(data?.result==='success'){
           toast({
               title: `Removed "${titleName}" from liked titles`,
               position:'top-right',
               status: 'success',
               duration: 1500,
               isClosable: true,
             })
            refetchLikedTitles();
       } else{
           toast({
               title: 'Something went wrong',
               description:'Please try again later',
               position:'top-right',
               status: 'error',
               duration: 1500,
               isClosable: true,
             })
       }
    }).catch((err) => {
       console.log(err);
       toast({
         title: 'Sorry',
         description:err.message,
         position:'top-right',
         status: 'error',
         duration: 1500,
         isClosable: true,
       })
     })


    }

    const removeFromlist=async(titleName)=>{
        removeFromWatchList(router?.query?.link)
        .unwrap()
       .then((data)=>{
        if(data?.result==='success'){
            toast({
                title: `Removed "${titleName}" from watchlist`,
                position:'top-right',
                status: 'success',
                duration: 1500,
                isClosable: true,
              })
          refetchWatchlist();
        } else{
            toast({
                title: 'Something went wrong',
                description:'Please try again later',
                position:'top-right',
                status: 'error',
                duration: 1500,
                isClosable: true,
              })
        }
     }).catch((err) => {
        console.log(err);
        toast({
          title: 'Sorry',
          description:err.message,
          position:'top-right',
          status: 'error',
          duration: 1500,
          isClosable: true,
        })
      })
    }

    const addToList=async(titleName)=>{
      addToWatchlist(video)
     .unwrap()
     .then((data)=>{
        if(data?.result==='success'){
            toast({
                title: `Added "${titleName}" to watchlist`,
                position:'top-right',
                status: 'success',
                duration: 1500,
                isClosable: true,
              })
          refetchWatchlist();
        } else{
            toast({
                title: 'Something went wrong',
                description:'Please try again later',
                position:'top-right',
                status: 'error',
                duration: 1500,
                isClosable: true,
              })
        }
     }).catch((err) => {
        console.log(err);
        toast({
          title: 'Sorry',
          description:err.message,
          position:'top-right',
          status: 'error',
          duration: 1500,
          isClosable: true,
        })
      })
    }

    return(
        <div className={styles.page}>
            {isLoading
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
            <Flex 
             flexDirection={['column-reverse','row']}
             w='100vw'
             >
 
                    <Box
                     h='100vh'
                     w='100vw'
                    >
                      <TopNavbar  passRef={btnRef}  openSideBar={onOpen}/>
                      <SideNavbar passRef={btnRef} isOpenSidebar={isOpen} closeSidebar={onClose}/>
                         <Text
                          fontSize={'5xl'}
                          textAlign='center'
                          m='4%'
                        >
                          {
                            video?.title
                          }
                        </Text>

                        <Flex m='10%' justifyContent={'space-around'}>

                            <Tooltip
                            label={isAlreadyLiked ? 'Remove from liked' : isLikeUpdating ? 'Liking It...' :'Like'}
                            hasArrow
                            >
                            <Button
                             onClick={()=>isAlreadyLiked ? removeFromLikedTitles(video?.title) : likeTheCurrentTitle(video?.title)}
                            >
                              <Icon
                               as={ isAlreadyLiked ?  AiFillLike : AiOutlineLike}
                            />
                            </Button>
                            </Tooltip>


                            <Tooltip
                            label={'Play'}
                            hasArrow
                            >
                            <Button
                            onClick={()=>router.push(`/play/${video?.id}`)}
                            >
                              <Icon
                               as={AiFillPlayCircle}
                            />
                            </Button>
                            </Tooltip>


                            <Tooltip
                             label={isOnWatchList ? 'Remove from watchlist' : isWatchlistUpdating ? 'Adding...' :  'Add To Watchlist'}
                             hasArrow
                            >
                            <Button
                             onClick={()=> isOnWatchList ? removeFromlist(video?.title) : addToList(video?.title)}
                            >
                                <Icon
                                as={ isOnWatchList ? FaBan : FaTv}
                            />
                            </Button>
                            </Tooltip>
                        </Flex>

                        <Flex m='5%'>
                            <Text
                            fontSize={'3xl'}
                            >
                                Synopsis
                            </Text>
                        </Flex>
                        <Flex m='5%'>
                           <Text>
                               {
                                video?.description
                               }
                            </Text>
                        </Flex>
                        </Box>

            </Flex>
        )}
        </div>
        
    )
}

export default StreamTitle;