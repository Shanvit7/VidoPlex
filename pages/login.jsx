import { useLoginUserMutation } from '../redux/services/authService';
import styles from './stylesheets/layout.module.css';
import { 
  Input,
  Button,
  useToast,
  Flex,
  Box ,
  FormLabel,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import {MdTheaters} from 'react-icons/md';
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router';
import Cookies from 'js-cookies';


const Login=()=>{
    const router = useRouter();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const toast = useToast();
    const [loginUser,{ isLoading: isUpdating }] = useLoginUserMutation();

  const onSubmit=data=>{
     const {email,password}=data;
     if(password?.length<8){
      toast({
        title: 'Password is less than 8 characters',
        position:'top-right',
        status: 'error',
        duration: 1000,
        isClosable: true,
      })
     } else {
     loginUser({email:email,password:password})
     .unwrap()
     .then((data)=>{
      if(data?.result==='success'){
          Cookies.setItem('access-token',data?.token);
          toast({
           title: 'Sign In Successful',
           position:'top',
           status: 'success',
           duration: 2000,
           isClosable: true,
        })
        router.push('/home');
      } else {
        toast({
          title: 'Something went wrong',
          description:'Please try again later...',
          position:'top-right',
          status: 'error',
          duration: 1500,
          isClosable: true,
        })
      }
     })
     .catch((err) => {
      toast({
        title: 'Sign In Failed',
        description:err.message,
        position:'top-right',
        status: 'error',
        duration: 1500,
        isClosable: true,
      })
    })
   }
     
  }


    return(
      <div className={styles.page}>
       <Flex flexDirection={'row'} >

        <Box width={'50vw'} height={'100vh'} display={'flex'} justifyContent={'center'}>
          <img src='/login.svg' />
        </Box>

         <Box
          backgroundColor={'black'}
          width={'50vw'}
          display={'flex'}
          justifyContent={'center'}
         >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex
             flexDirection={'column'}
             alignItems='center'
            >
            <Text
            textAlign={'center'}
            color={'#a742f5'}
            m='4%'
            fontSize={'7xl'}
            >
              Sign In
            </Text>


            <Flex
            flexDirection={'column'}
            m='2%'
            >
            <FormLabel
            color={'#a742f5'}
            textAlign='start'
            >
              Email
            </FormLabel>
            <Input 
             {...register("email",{required:true})} 
             type={'email'}
             width={'40vw'}
             color={'#a742f5'}
             focusBorderColor="#a742f5"
             variant={'flushed'}
             isRequired
             />
             </Flex>

             <Flex
            flexDirection={'column'}
            m='8%'
            >
            <FormLabel
            color={'#a742f5'}
            textAlign='start'
            >
              Password
            </FormLabel>
            <Input 
             {...register("password",{required:true})} 
             type={'password'}
             width={'40vw'}
             color={'#a742f5'}
             focusBorderColor="#a742f5"
             variant={'flushed'}
             isRequired
             />
             </Flex>

             <Tooltip
             label={isUpdating ? 'Signing In': 'Sign In'}
             hasArrow
             bg={"#a742f5"}
             >
             <Button
             size={'lg'}
             leftIcon={<MdTheaters/>}
             type={'submit'}
             isLoading={isUpdating}
             >
               Let's Stream
             </Button>
             </Tooltip>

              </Flex>
          </form>
         </Box>
       </Flex>
      </div>
    )
}

export default Login;