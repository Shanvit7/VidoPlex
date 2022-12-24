import styles from './stylesheets/home.module.css';
import TopNavbar from '../components/TopNavbar';
import SideNavbar from '../components/SideNavbar';
import {useRef} from 'react';
import {
    useDisclosure,
} from '@chakra-ui/react';
import {GraphQLClient,gql} from 'graphql-request';
import Slider from '../components/Slider';


const Home=({videos})=>{
    const { isOpen,onClose,onOpen } = useDisclosure();
    const btnRef = useRef();


    return(
        <div className={styles.page}>
           <TopNavbar  passRef={btnRef}  openSideBar={onOpen}/>
           <SideNavbar passRef={btnRef} isOpenSidebar={isOpen} closeSidebar={onClose}/>

           <Slider videos={videos} contentTitle={'New Release'} />


        </div>
    )
}

export const getStaticProps = async ()=>{

    const url = process.env.ENDPOINT;
    const graphQLClient = new GraphQLClient(url,
      {headers:{
        "Authorization":process.env.GRAPH_CMS_TOKEN
      }}
    )
const getAllvideos = gql`
query{
  videos{
    createdAt,
    id,
    title,
    description,
    seen,
    slug,
    tags,
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