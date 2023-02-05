import { useRegisterUserMutation } from '../redux/services/authService';
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
import { useForm } from "react-hook-form";
import {useRouter} from 'next/router';
import {BsPersonBadge} from 'react-icons/bs';




const Register=()=>{
    const router = useRouter();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const toast = useToast();
    const [registerUser,{ isLoading: isUpdating }] = useRegisterUserMutation();

  const onSubmit=data=>{
    const {email,password,confirmPassword}=data;
    if(password?.length<8){
      toast({
        title: 'Password is less than 8 characters',
        position:'top-right',
        status: 'error',
        duration: 1000,
        isClosable: true,
      })
    }
    else if (password !== confirmPassword){
      toast({
        title: 'Passwords do not match',
        position:'top-right',
        status: 'error',
        duration: 1000,
        isClosable: true,
      })
    }else{
     registerUser({email:email,password:password})
     .unwrap()
     .then((data)=>{
      if(data.result==='success'){
        toast({
          title: 'Account Created.',
          description: "We've created your account for you.",
          position:'top-right',
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
         router.push('/login');
      } else {
        toast({
          title: 'Registration Failed',
          description: "Try again later...",
          position:'top-right',
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
      }
     })
     .catch((err) => {
      toast({
        title: 'Registration Failed',
        description:err.message,
        position:'top-right',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    })
    }
  }

return(
   <div className={styles.page}>
  <Flex flexDirection={'row'} >
    <Flex width={'50vw'} height={'100vh'} display={['none','none','none','flex']} justifyContent={'center'}>
     <img src='/register.svg' />
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
      Sign Up
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
    flexDirection={'column'}
    m='8%'
    >
    <FormLabel
    color={'#a742f5'}
    textAlign='start'
    >
     Confirm Password
    </FormLabel>
    <Input 
     {...register("confirmPassword",{required:true})} 
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
     label={isUpdating ? 'Creating account..': 'Sign Up'}
     hasArrow
     bg={"#a742f5"}
     >
     <Button
     size={'lg'}
     leftIcon={<BsPersonBadge/>}
     type={'submit'}
     isLoading={isUpdating}
     >
       Create Account
     </Button>
     </Tooltip>

     <Text>
       OR
     </Text>

     <Text as='u' cursor={'pointer'} onClick={()=>router.push('/login')}>
      Already have an account
     </Text>

     </Flex>


      </Flex>
  </form>
 </Flex>
</Flex>
      </div>
    )
}

export default Register;