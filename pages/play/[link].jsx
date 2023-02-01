import dynamic from 'next/dynamic';
import {useRouter} from  'next/router';
import { useGetVideoQuery } from '../../redux/services/videoService';
const CustomPlayer = dynamic(() => import('../../components/CustomPlayer'), {
    ssr:false,
})
import styles from '../stylesheets/layout.module.css';
import { Spinner,Box,Text } from '@chakra-ui/react';

const StreamPlayer=()=>{
    const router = useRouter();
    const {data:video,error,isLoading} = useGetVideoQuery(router.query.link);
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
            (<CustomPlayer
             video={video}
            />)
            }
        </div>
    )
}

export default StreamPlayer;