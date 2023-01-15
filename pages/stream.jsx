import styles from './stylesheets/layout.module.css';
import dynamic from 'next/dynamic';
import { Flex,Box,Button, Icon,Text } from '@chakra-ui/react';
import {FaPlay,FaThumbsUp,FaTv}  from 'react-icons/fa';
import {GrAdd} from 'react-icons/gr';
const ReactPlayer = dynamic(
    () => import('react-player'),
    { ssr: false }
);

const Stream=()=>{
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
                          Title of Video
                        </Text>
                        <Flex m='10%' justifyContent={'space-around'}>
                            <Button>
                                <Icon
                                as={FaPlay}
                            />
                            </Button>
                              <Button>
                                <Icon
                                 as={FaThumbsUp}
                            />
                            </Button>
                              <Button>
                                <Icon
                                as={FaTv}
                            />
                            </Button>
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
                                This is a sample trivia about some published video, VidoPlex is a ongoing video streaming FaaS based platform.
                                Wabba lub dub.Lorem Ipsum Dim uno dos trea cuatro cinco sies siete ocho nueve dias
                            </Text>
                        </Flex>
                    </Box>

                    <Box
                    h={['50vh','100vh']}
                    w={['100vw','50vw']}
                    >
                    <ReactPlayer
                         url={'https://www.youtube.com/watch?v=ysz5S6PUM-U'}
                         playing={false}
                         key={''}
                         height={'100%'}
                         width={'100%'}
                    />
                    </Box>
            </Flex>
        </div>
    )
}

export default Stream;