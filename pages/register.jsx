import {useState} from 'react';
import { registerUser } from '../redux/slices/authSlice';
import {useDispatch} from 'react-redux';
import styles from './stylesheets/register.module.css';
import { Center,Input,Button } from '@chakra-ui/react';
import { useForm } from "react-hook-form";
import {useRouter} from 'next/router';




const Register=()=>{
    const dispatch = useDispatch();
    const router = useRouter();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [passwordError,setPasswordError] = useState(false);

  const onSubmit=data=>{
    const {email,password,confirmPassword}=data;
    if (password !== confirmPassword){
     setPasswordError(true)
    }else{
     setPasswordError(false)
     dispatch(registerUser({email:email,password:password}));
     router.push('/login');
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
            {passwordError ? <p className={styles.register_error}>Passwords do not match !</p>:''}
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