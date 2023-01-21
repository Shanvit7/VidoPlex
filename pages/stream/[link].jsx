import styles from '../stylesheets/layout.module.css';
import dynamic from 'next/dynamic';
import { Flex,Box,Button, Icon,Text,Spinner } from '@chakra-ui/react';
import {FaThumbsDown,FaThumbsUp,FaTv}  from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useGetVideoQuery } from '../../redux/services/videoService';
import { Tooltip } from '@chakra-ui/react';

const ReactPlayer = dynamic(
    () => import('react-player'),
    { ssr: false }
);

const StreamVideo=()=>{
    const router = useRouter();
    const {data,error,isLoading} = useGetVideoQuery(router?.query?.link);

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
                            data?.title
                          }
                        </Text>
                        <Flex m='10%' justifyContent={'space-around'}>

                            <Tooltip
                            label={'Liked This'}
                            hasArrow
                            >
                            <Button>
                                <Icon
                                as={FaThumbsUp}
                            />
                            </Button>
                            </Tooltip>

                            <Tooltip
                            label={'Not for me'}
                            hasArrow
                            >
                            <Button>
                                <Icon
                                 as={FaThumbsDown}
                            />
                            </Button>
                            </Tooltip>

                            <Tooltip
                            label={'Add To  Watchlist'}
                            hasArrow
                            >
                            <Button>
                                <Icon
                                as={FaTv}
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
                                data?.description
                               }
                            </Text>
                        </Flex>
                    </Box>

                    <Box
                    h={['50vh','100vh']}
                    w={['100vw','50vw']}
                    >
                    <ReactPlayer
                         url={data?.mp4?.url}
                         playing={true}
                         controls={true}
                         light={data?.thumbnail2.url}
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