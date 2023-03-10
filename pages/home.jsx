import styles from './stylesheets/layout.module.css';
import TopNavbar from '../components/TopNavbar';
import SideNavbar from '../components/SideNavbar';
import {useRef} from 'react';
import {
    useDisclosure,Text,
} from '@chakra-ui/react';
import {GraphQLClient,gql} from 'graphql-request';
import VideoDrawer from '../components/VideoDrawer';


const Home=({videos})=>{
    const { isOpen,onClose,onOpen } = useDisclosure();
    const btnRef = useRef();

    return(
        <div className={styles.page}>
           <TopNavbar  passRef={btnRef}  openSideBar={onOpen}/>
           <Text 
             textAlign={'center'}
             fontSize={['3xl',null,'3xl','4xl','5xl']}
           >
             VidoPlex
           </Text>
           <SideNavbar passRef={btnRef} isOpenSidebar={isOpen} closeSidebar={onClose}/>
           <VideoDrawer videos={videos} contentTitle={'New Release'} />
        </div>
    )
}

export const getStaticProps = async ()=>{

    const url = process.env.NEXT_PUBLIC_ENDPOINT;
    const graphQLClient = new GraphQLClient(url,
      {headers:{
        "Authorization":process.env.NEXT_PUBLIC_GRAPH_CMS_TOKEN
      }}
    )
const getAllvideos = gql`
query{
  videos{
    title,
    id,
    description,
    thumbnail{
      url
    },
    mp4{
      url
    }
  }
}
`;

  const data = await graphQLClient.request(getAllvideos);
  const videos = data.videos;
  
  return{
    props:{
      videos,
    }
  }
}


export default Home;