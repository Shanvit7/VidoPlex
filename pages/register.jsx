import { registerUser } from '../redux/slices/authSlice';
import {useDispatch} from 'react-redux';
import styles from './stylesheets/register.module.css';
import { Center,Input,Button,useToast} from '@chakra-ui/react';
import { useForm } from "react-hook-form";
import {useRouter} from 'next/router';




const Register=()=>{
    const dispatch = useDispatch();
    const router = useRouter();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const toast = useToast();

  const onSubmit=data=>{
    const {email,password,confirmPassword}=data;
    if (password !== confirmPassword){
      toast({
        title: 'Passwords do not match',
        position:'top-right',
        status: 'error',
        duration: 1000,
        isClosable: true,
      })
    }else{
     dispatch(registerUser({email:email,password:password}))
     .unwrap()
     .then((data)=>{
      if(data.result==='success'){
        toast({
          title: 'Account created.',
          description: "We've created your account for you.",
          position:'top-right',
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
        router.push('/login');
      } else {
        toast({
          title: 'Registration failed',
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
        title: 'Registration failed',
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
         <Center>
           <h1 className={styles.title}>
              Sign Up Now
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
             <Input
               {...register("confirmPassword",{required:true})} 
                 className={styles.register_field}
                 width='50%'
                 type='password' 
                 variant='flushed' 
                 placeholder='Confirm Password'
                 focusBorderColor="#a742f5"
              />
            </Center>
            <Center>
            </Center>

  


            <Center>
              <Button type='submit' className={styles.register_field}>
                Create Account
              </Button>
            </Center>
         </form>
      </div>
    )
}

export default Register;