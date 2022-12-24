import {
    Grid,
    GridItem,
    Button,
    Center,
    Text,
    Icon
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { GrPrevious,GrNext } from 'react-icons/gr';
const ReactPlayer = dynamic(
    () => import('react-player'),
    { ssr: false }
)
import {useState} from 'react';


const Slider=({videos,contentTitle})=>{

   const [firstIndex,setFirstIndex]=useState(0);
   const [lastIndex,setLastIndex]=useState(4);

   const loadNextVideos=()=>{
     setFirstIndex(firstIndex+1);
     setLastIndex(lastIndex+1);
    }

    const loadPreviousVidoes=()=>{
     setFirstIndex(firstIndex-1);
     setLastIndex(lastIndex-1);
    }

    return(
    <>
     <Text fontSize='4xl' m="2%">
       {contentTitle}
     </Text>

           <Grid templateColumns={'repeat(6,1fr)'} gap={3}>

            <GridItem >
             <Center>
                <Button 
                   onClick={()=>loadPreviousVidoes()} 
                   display={firstIndex<=0?'none':'block'}
                   backgroundColor='#a742f5'
                >
                  <Icon
                  as={GrPrevious}
                  />
                </Button>
             </Center>
            </GridItem>

           {
            videos?.slice(firstIndex,lastIndex).map((video,key)=>(
                <GridItem  w={['100%','100%','80%','80%','80%']} h={['7vh','10vh','15vh','20vh','25vh']} margin={['10%',null,null,null,'8%']}>
                <ReactPlayer
                 url={video.mp4.url}
                 playing={false}
                 light={video.thumbnail.url}
                 key={key}
                 height={'100%'}
                 width={'100%'}
              />
             </GridItem>
            ))
           }

           <GridItem>
           <Center>
            <Button
             onClick={()=>loadNextVideos()}
             display={lastIndex>videos?.length?'none':'block'}
             backgroundColor='#a742f5'
            >
            <Icon
            as={GrNext}
            />
            </Button>
             </Center>
           </GridItem>

           </Grid>
    </>
    )

}

export default Slider;