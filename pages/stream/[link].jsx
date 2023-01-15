import styles from '../stylesheets/layout.module.css';
import dynamic from 'next/dynamic';
import { Flex,Box,Button, Icon,Text } from '@chakra-ui/react';
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
    console.log(data);

    return(
        <div className={styles.page}>
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
                            >
                            <Button>
                                <Icon
                                as={FaThumbsUp}
                            />
                            </Button>
                            </Tooltip>

                            <Tooltip
                            label={'Not for me'}
                            >
                            <Button>
                                <Icon
                                 as={FaThumbsDown}
                            />
                            </Button>
                            </Tooltip>

                            <Tooltip
                            label={'Add To  Watchlist'}
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
        </div>
    )
}

export default StreamVideo;