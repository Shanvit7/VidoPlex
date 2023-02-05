import { Flex,Text,Tooltip,Button, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import {TfiVideoClapper} from 'react-icons/tfi';

const LandingPage=()=>{
  const router = useRouter();
  return (
    <Flex
    flexDirection={'column'}
    width={'100vw'}
    height={'100vh'}
    overflow='hidden'
    >

      <Text
      textAlign={'center'}
      marginTop='4'
      fontSize={['6xl','8xl']}
      >
        VidoPlex
      </Text>

      <Flex width={'100vw'} height={['60%']} justifyContent={'center'}>
          <Image src='/landing.svg' alt='image' />
      </Flex>

      <Flex
      justifyContent={'center'}
      marginTop='12'
      >
      <Tooltip
        label={'Continue'}
        hasArrow
        bg={"#a742f5"}
      >
      <Button
         size={'lg'}
         onClick={()=>router.push('/register')}
         leftIcon={<TfiVideoClapper/>}
      >
         Let&apos;s Stream
      </Button>
      </Tooltip>
      </Flex>



    </Flex>
  )
}

export default LandingPage;