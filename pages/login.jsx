import {useState} from 'react';
import { registerUser } from '../redux/slices/authSlice';
import {useDispatch} from 'react-redux';
import styles from './stylesheets/register.module.css';
import { Center,Input,Button } from '@chakra-ui/react';
import { useForm } from "react-hook-form";


const Login=()=>{
    const dispatch = useDispatch();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit=data=>{
    const {email,password}=data;
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