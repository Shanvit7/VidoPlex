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
} from '@chakra-ui/react';
import {ImHome,ImUser,ImExit} from 'react-icons/im';
import {FaVoteYea,FaThumbsUp} from 'react-icons/fa';
import {AiTwotoneSetting} from 'react-icons/ai';

const SideNavbar=({passRef,closeSidebar,isOpenSidebar})=>{
    return(
      <Drawer
         isOpen={isOpenSidebar}
         placement='left'
         onClose={closeSidebar}
         finalFocusRef={passRef}
         size={'lg'}
       >
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
                w='40%'
               leftIcon={<ImHome color='white' size={'1rem'}/>}
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
               w='40%'
               leftIcon={<FaVoteYea color='white' size={'1rem'}/>}
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
               w='40%'
               leftIcon={<FaThumbsUp color='white' size={'1rem'}/>}
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
               w='40%'
               leftIcon={<ImUser color='white' size={'1rem'}/>}
              >
              <Text 
               fontSize={'2xl'}
               color='white'
               >
                  My account
                </Text>
              </Button>
              </Center>

              <Center marginTop='8%'>
              <Button
               bg={'transparent'}
               _hover={{ bg: 'rgba(0,0,0,0.5)'}}
               w='40%'
               leftIcon={<AiTwotoneSetting color='white' size={'1rem'}/>}
              >
              <Text 
               fontSize={'2xl'}
               color='white'
              >
                  Settings
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
               w='40%'
               leftIcon={<ImExit color='white' size={'1rem'}/>}
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