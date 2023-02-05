import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Text,
    Center,
    Button,
    useDisclosure,
} from '@chakra-ui/react';
import {ImHome,ImExit,ImHistory} from 'react-icons/im';
import {FaVoteYea,FaThumbsUp} from 'react-icons/fa';
import { useRouter } from 'next/router';
import LogoutDialogBox from './LogoutDialogBox';


const SideNavbar=({passRef,closeSidebar,isOpenSidebar})=>{
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

    return(
      <Drawer
         isOpen={isOpenSidebar}
         placement='left'
         onClose={closeSidebar}
         finalFocusRef={passRef}
         size={'lg'}
       >
        <LogoutDialogBox 
         isOpenLogOutDialogBox={isOpen}
         closeLogOutDialogBox={onClose}
        />
         <DrawerOverlay/>
        <DrawerContent  style={{backgroundColor:'#a742f5'}}>
        <DrawerCloseButton color={'white'}/>
            <DrawerHeader>
                <Center>
                    <Text 
                      fontSize={'4xl'}
                      color='white'
                      >
                      VidoPlex
                    </Text>
                </Center>
            </DrawerHeader>

            <DrawerBody >

              <Center  marginTop='8%'>
              <Button
               bg={'transparent'}
               _hover={{ bg: 'rgba(0,0,0,0.5)'}}
               w={['80%','40%']}
               leftIcon={<ImHome color='white' size={'1rem'}/>}
               onClick={()=>router.push('/home')}
              >
              <Text 
               fontSize={'2xl'} 
               color='white'
               >
                  Home
                </Text>
              </Button>
              </Center>

              <Center  marginTop='8%'>
              <Button
               bg={'transparent'}
               _hover={{ bg: 'rgba(0,0,0,0.5)'}}
               w={['80%','40%']}
               leftIcon={<FaVoteYea color='white' size={'1rem'}/>}
               onClick={()=>router.push('/watchlist')}
              >
              <Text 
              fontSize={'2xl'}
              color='white'
              >
                  Watchlist
                </Text>
              </Button>
              </Center>

              <Center  marginTop='8%'>
              <Button
               bg={'transparent'}
               _hover={{ bg: 'rgba(0,0,0,0.5)'}}
               w={['80%','40%']}
               leftIcon={<FaThumbsUp color='white' size={'1rem'}/>}
               onClick={()=>router.push('/liked-titles')}
              >
              <Text
               fontSize={'2xl'}
               color='white'
               >
                  Liked Titles
                </Text>
              </Button>
              </Center>

              <Center  marginTop='8%'>
              <Button
               bg={'transparent'}
               _hover={{ bg: 'rgba(0,0,0,0.5)'}}
               w={['80%','40%']}
               leftIcon={<ImHistory color='white' size={'1rem'}/>}
               onClick={()=>router.push('/watch-history')}
              >
              <Text 
               fontSize={'2xl'}
               color='white'
               >
                  Watch History
                </Text>
              </Button>
              </Center>


              <Center 
               marginTop='8%'
               color='white'
               >
              <Button
               bg={'transparent'}
               _hover={{ bg: 'rgba(0,0,0,0.5)'}}
               w={['80%','40%']}
               leftIcon={<ImExit color='white' size={'1rem'}/>}
               onClick={onOpen}
              >
              <Text 
              fontSize={'2xl'}
              color='white'
              >
                  Logout
                </Text>
              </Button>
              </Center>
          
         

            </DrawerBody>

            <DrawerFooter>
                
            </DrawerFooter>
        </DrawerContent>

      </Drawer>
    )
}

export default SideNavbar;