import {
    SimpleGrid,
    Box,
    Button,
    Text,
    Icon,
    Card,
    Image
} from '@chakra-ui/react';
import React, {useState} from 'react';
import { useRouter } from 'next/router';
import {CgChevronRightO,CgChevronLeftO} from 'react-icons/cg';
import { motion } from 'framer-motion';

const VideoDrawer=({contentTitle,videos})=>{
  const [showRightSlide,setShowRightSlide]=useState(false);
  const [showLeftSlide,setShowLeftSlide]=useState(false);
  const [startIndex,setStartIndex]= useState(0);
  const [lastIndex,setLastIndex] = useState(4);
  const router = useRouter();
  const loadNextVideos=()=>{
    if(lastIndex+4>videos.length){
      return;
    }
    setStartIndex(startIndex+4);
    setLastIndex(lastIndex+4);
  }
  const loadPrevVideos=()=>{
    if(startIndex <=0 ){
      return;
    }
    setStartIndex(startIndex-4);
    setLastIndex(lastIndex-4);
  }

  return(
    <>
    <Text fontSize={['1xl',null,null,'3xl','4xl']} m='2%'>
      {contentTitle}
    </Text>


    <Button
     display={['none','none',showLeftSlide ? 'block':'none',showLeftSlide ? 'block':'none',showLeftSlide ? 'block':'none']}
     position={'absolute'}
     as={motion.div}
     zIndex={2}
     left={'1%'}
     top={[null,'11rem','12rem','16rem','20rem','22rem']}
     bgColor={'transparent'}
     _hover={{ bg: 'transparent'}}
     _active={{bg:'transparent'}}
     onMouseEnter={()=>{setShowLeftSlide(true);setShowRightSlide(true)}}
     onMouseLeave={()=>{setShowLeftSlide(false);setShowRightSlide(false)}}
     onClick={()=>loadPrevVideos()}
    >
    <Icon 
     as={CgChevronLeftO}
     color={'white'}
     boxSize={'3rem'}
    />
    </Button>

    <Button
     display={['none','none',showRightSlide ? 'block':'none',showRightSlide ? 'block':'none',showRightSlide ? 'block':'none']}
     position={'absolute'}
     as={motion.div}
     zIndex={2}
     left={'95%'}
     top={[null,'11rem','12rem','16rem','20rem','22rem']}
     bgColor={'transparent'}
     _hover={{ bg: 'transparent'}}
     _active={{bg:'transparent'}}
     onMouseEnter={()=>{setShowLeftSlide(true);setShowRightSlide(true)}}
     onMouseLeave={()=>{setShowLeftSlide(false);setShowRightSlide(false)}}
     onClick={()=>loadNextVideos()}
    >
    <Icon 
     as={CgChevronRightO}
     color={'white'}
     boxSize={'3rem'}
    />
    </Button>
    <SimpleGrid 
       spacing={5} 
       autoFlow={'column'}
       m="1%"
       overflowX={['auto','auto','unset','unset','unset']}
       onMouseEnter={()=>{setShowLeftSlide(true);setShowRightSlide(true)}}
       onMouseLeave={()=>{setShowLeftSlide(false);setShowRightSlide(false)}}
       as={motion.div}
       transition={{ease: "easeOut", duration: 2 }}
    >
      { videos?.slice(startIndex,lastIndex).map((video,key)=>(
           <Box
            w={'20vw'}
            key={key}
            as={motion.div}
            whileHover={{scale:1.1}}
           >
              <Card
               cursor={'pointer'}
               key={key}
              >
                <Image 
                 src={video?.thumbnail.url}
                 alt={'video'}
                 onClick={()=>{
                 router.push(`/watch/${video.id}`)
                 key={key}
              }}
                />
              </Card>
           </Box>
       ))
     }
    </SimpleGrid>

    </>
  )
}

export default VideoDrawer;