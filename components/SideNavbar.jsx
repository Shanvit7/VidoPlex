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
        <DrawerContent  style={{backgroundColor:"#10051a"}}>
        <DrawerCloseButton />
            <DrawerHeader>
                <Center>
                    <Text fontSize={'4xl'}>
                      VidoPlex
                    </Text>
                </Center>
            </DrawerHeader>

            <DrawerBody >

              <Center  marginTop='8%'>
              <Button
               bg={'transparent'}
              >
              <Text fontSize={'2xl'}>
                  Home
                </Text>
              </Button>
              </Center>

              <Center  marginTop='8%'>
              <Button
               bg={'transparent'}
              >
              <Text fontSize={'2xl'}>
                  Watchlist
                </Text>
              </Button>
              </Center>

              <Center  marginTop='8%'>
              <Button
               bg={'transparent'}
              >
              <Text fontSize={'2xl'}>
                  Liked Titles
                </Text>
              </Button>
              </Center>

              <Center  marginTop='8%'>
              <Button
               bg={'transparent'}
              >
              <Text fontSize={'2xl'}>
                  My account
                </Text>
              </Button>
              </Center>

              <Center marginTop='8%'>
              <Button
               bg={'transparent'}
              >
              <Text fontSize={'2xl'}>
                  Settings
                </Text>
              </Button>
              </Center>

              <Center  marginTop='8%'>
              <Button
               bg={'transparent'}
              >
              <Text fontSize={'2xl'}>
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