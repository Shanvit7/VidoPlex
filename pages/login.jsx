import { loginUser } from '../redux/slices/authSlice';
import {useDispatch} from 'react-redux';
import styles from './stylesheets/register.module.css';
import { Center,Input,Button,useToast } from '@chakra-ui/react';
import { useForm } from "react-hook-form";
import { useRouter } from 'next/router';


const Login=()=>{
    const dispatch = useDispatch();
    const router = useRouter();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const toast = useToast();

  const onSubmit=data=>{
     const {email,password}=data;
     dispatch(loginUser({email:email,password:password}))
     .unwrap()
     .then((data)=>{
      if(data?.result==='success'){
         localStorage.setItem("Id",data?.email);
        toast({
          title: 'Sign In Successful',
          position:'custom',
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
        router.push('/home');
      } else {
        toast({
          title: 'Something went wrong',
          description:'Please try again later...',
          status: 'error',
          duration: 1000,
          isClosable: true,
        })
      }
     })
     .catch((err) => {
      toast({
        title: 'Sign In Failed',
        description:err.message,
        status: 'error',
        duration: 1000,
        isClosable: true,
      })
    })
     
  }


    return(
      <div className={styles.page}>
         <Center>
           <h1 className={styles.title}>
              Sign In
           </h1>
         </Center>

         <form onSubmit={handleSubmit(onSubmit)} className={styles.register_form} >
           <Center>
             <Input
               {...register("email",{required:true})} 
                 className={styles.register_field}
                 width='50%'
                 type='email' 
                 variant='flushed' 
                 placeholder='Email'
                 focusBorderColor="#a742f5"
              />
            </Center>

            <Center>
             <Input
               {...register("password",{required:true})} 
                 className={styles.register_field}
                 width='50%'
                 type='password' 
                 variant='flushed' 
                 placeholder='Password'
                 focusBorderColor="#a742f5"
              />
            </Center>

            <Center>
              <Button type='submit' className={styles.register_field}>
                Let's Stream
              </Button>
            </Center>
         </form>
      </div>
    )
}

export default Login;