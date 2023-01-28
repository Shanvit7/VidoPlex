import styles from '../stylesheets/layout.module.css';
import dynamic from 'next/dynamic';
import { Flex,Box,Button, Icon,Text,Spinner,useToast, } from '@chakra-ui/react';
import {FaTv,FaBan}  from 'react-icons/fa';
import {AiFillLike,AiOutlineLike} from 'react-icons/ai';
import { useRouter } from 'next/router';
import { useGetVideoQuery } from '../../redux/services/videoService';
import { Tooltip } from '@chakra-ui/react';
import { 
  useAddToWatchListMutation,
  useMyWatchListQuery,
  useRemoveFromWatchListMutation,
  useLikeTheTitleMutation,
  useLikedTitlesQuery,
  useRemoveFromLikedMutation,
} from '../../redux/services/userService';
import { useState,useEffect} from 'react';

const ReactPlayer = dynamic(
    () => import('react-player'),
    { ssr: false }
);

const StreamVideo=()=>{
    const router = useRouter();
    const toast = useToast();
    const {data:watchlist,refetch:refetchWatchlist} = useMyWatchListQuery();
    const {data:likedTitles,refetch:refetchLikedTitles}= useLikedTitlesQuery();
    const {data:video,error,isLoading} = useGetVideoQuery(router.query.link);
    const [addToWatchlist,{ isLoading: isWatchlistUpdating }] = useAddToWatchListMutation();
    const [removeFromLiked,{ isLoading: isLikedRemoveUpdating }] = useRemoveFromLikedMutation();
    const [removeFromWatchList]=useRemoveFromWatchListMutation();
    const [likeTheTitle,{isLoading:isLikeUpdating}]= useLikeTheTitleMutation();
    const [isOnWatchList,setIsOnWatchList] = useState();
    const [isAlreadyLiked,setIsAlreadyLiked]=useState();

    useEffect(()=>{
      if(watchlist)
       setIsOnWatchList(watchlist?.data?.includes(router?.query?.link));
    });

    useEffect(()=>{
      if(likedTitles)
       setIsAlreadyLiked(likedTitles?.data?.includes(router?.query?.link));
    });


    const likeTheCurrentTitle=async(titleName)=>{
      likeTheTitle(router?.query?.link)
      .unwrap()
      .then((data)=>{
       if(data?.result==='success'){
           toast({
               title: `You have liked ${titleName}`,
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
               title: `Removed ${titleName} from liked titles`,
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

    const removeFromlist=async()=>{
        removeFromWatchList(router?.query?.link)
        .unwrap()
       .then((data)=>{
        if(data?.result==='success'){
            toast({
                title: 'Removed from watchlist',
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

    const addToList=async()=>{
      addToWatchlist(router?.query?.link)
     .unwrap()
     .then((data)=>{
        if(data?.result==='success'){
            toast({
                title: 'Added to watchlist',
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
            <Flex flexDirection={['column-reverse','row']}>

                    <Box
                     h='100vh'
                     w={['100vw','50vw']}
                    >
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
                            label={isAlreadyLiked ? 'Remove from liked' : isLikeUpdating ? 'Liking this...' :'Like This'}
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
                             label={isOnWatchList ? 'Remove from watchlist' : isWatchlistUpdating ? 'Adding...' :  'Add To Watchlist'}
                             hasArrow
                            >
                            <Button
                             onClick={isOnWatchList ? removeFromlist : addToList}
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
                                Trivia
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

                    <Box
                    h={['50vh','100vh']}
                    w={['100vw','50vw']}
                    >
                    <ReactPlayer
                         url={video?.mp4?.url}
                         playing={true}
                         controls={true}
                         light={video?.thumbnail2.url}
                         height={'100%'}
                         width={'100%'}
                    />
                    </Box>
            </Flex>
        )}
        </div>
        
    )
}

export default StreamVideo;