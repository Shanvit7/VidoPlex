import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
} from '@chakra-ui/react'
import { useRef } from 'react';
import Cookies from 'js-cookies';
import { useRouter } from 'next/router';

const LogoutDialogBox=({isOpenLogOutDialogBox,closeLogOutDialogBox})=>{
    const logOutRef = useRef();
    const router = useRouter();
    
    const onLogOut=()=>{
       closeLogOutDialogBox();
       Cookies.removeItem('access-token');
       router.push('/');
    }

    return(
        <AlertDialog
         isOpen={isOpenLogOutDialogBox}
         leastDestructiveRef={logOutRef}
         onClose={closeLogOutDialogBox}
        >
             <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Logout User
            </AlertDialogHeader>

            <AlertDialogBody>
              You can always login later with valid  credentials
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={logOutRef} onClick={closeLogOutDialogBox}>
                Cancel
              </Button>
              <Button colorScheme='red'  onClick={()=>onLogOut()} ml={3}>
                Logout
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
        </AlertDialog>
    )
}

export default LogoutDialogBox;