import {
    SimpleGrid,
    Box,
    Button,
    Center,
    Text,
    Icon,
} from '@chakra-ui/react';
import {useState} from 'react';
import dynamic from 'next/dynamic';
import { GrDown,GrUp } from 'react-icons/gr';
import { useRouter } from 'next/router';

const ReactPlayer = dynamic(
    () => import('react-player'),
    { ssr: false }
)

const VideoDrawer=({contentTitle,videos})=>{
  const [lastIndex,setLastIndex]=useState(4);
  const [isLastStack,setIsLastStack]=useState(false);
  const router = useRouter();

  const loadNextVideos=()=>{
    if( (lastIndex+4) > videos.length){
      setIsLastStack(true);
    }
      setLastIndex(lastIndex+4);
  }

  const resetDrawer=()=>{
    setLastIndex(4);
    setIsLastStack(false);
  }
       
  return(
    <>
    <Text fontSize={['1xl',null,null,'3xl','4xl']} m='2%'>
      {contentTitle}
    </Text>

    <SimpleGrid templateColumns={`repeat(4, 1fr)`} spacing={15} m='1%' >
      {
       videos?.slice(0,lastIndex).map((video,key)=>(
           <Box
           w={[null,'25','25','25','30']}
           h={[null,'70','60','60','60']}
           >
             <ReactPlayer
              onClick={()=>{
                 router.push(`/stream/${video.id}`)
              }}
              url={video.mp4.url}
              playing={false}
              light={video.thumbnail.url}
              key={video.id}
              height={'100%'}
              width={'100%'}
           />
           </Box>
       ))
     }
    </SimpleGrid>

    <Center>
    <Button 
        onClick={isLastStack ? ()=>resetDrawer() : ()=>loadNextVideos()} 
        backgroundColor='#a742f5'
        w={['5','10','20']}
        h='5'
        m='5'
    >
    <Icon
      as={isLastStack ? GrUp : GrDown}
    />
    </Button>
    </Center>
    </>
  )
}

export default VideoDrawer;