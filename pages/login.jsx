import { useLoginUserMutation } from '../redux/services/authService';
import styles from './stylesheets/layout.module.css';
import { 
  Input,
  Button,
  useToast,
  Flex,
  FormLabel,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import {MdTheaters} from 'react-icons/md';
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router';
import Cookies from 'js-cookies';
import { useState } from 'react';


const Login=()=>{
    const router = useRouter();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const toast = useToast();
    const [isUpdating,setIsUpdating]=useState(false);
    const [loginUser] = useLoginUserMutation();

  const onSubmit=data=>{
    setIsUpdating(true);
     const {email,password}=data;
     if(password?.length<8){
      setIsUpdating(false);
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
           title: 'Sign In Successful.Redirecting in few seconds',
           position:'top',
           status: 'success',
           duration: 2000,
           isClosable: true,
        })
        router.push('/home');
      } else {
        setIsUpdating(false);
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
      setIsUpdating(false);
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

        <Flex width={'50vw'} height={'100vh'} display={['none','none','none','flex']} justifyContent={'center'}>
          <img src='/login.svg' />
        </Flex>

         <Flex
          backgroundColor={'black'}
          width={['100vw','100vw','100vw','50vw']}
          justifyContent={'center'}
         >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex
             flexDirection={'column'}
             alignItems='center'
             height={['100vh',null,null,null]}
             justifyContent={['space-around',null,null,null]}
            >
            <Text
            textAlign={'center'}
            color={'#a742f5'}
            m='4%'
            fontSize={['4xl','5xl','6xl','7xl']}
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
             width={['80vw',null,null,'40vw']}
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
             width={['80vw',null,null,'40vw']}
             color={'#a742f5'}
             focusBorderColor="#a742f5"
             variant={'flushed'}
             isRequired
             />
             </Flex>

             
             <Flex
             flexDirection="column"
             alignItems={'center'}
             justifyContent='space-around'
             height={'15vh'}
             >
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
               Continue
             </Button>
             </Tooltip>

           
            <Text>
              OR
           </Text>
         

           <Text as='u' cursor={'pointer'} onClick={()=>router.push('/register')}>
            Create an account
          </Text>
          </Flex>


              </Flex>
          </form>
         </Flex>
       </Flex>
      </div>
    )
}

export default Login;