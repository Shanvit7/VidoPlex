import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Center,
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
                    VidoPlex
                </Center>
            </DrawerHeader>

            <DrawerBody>

            </DrawerBody>

            <DrawerFooter>
                
            </DrawerFooter>
        </DrawerContent>

      </Drawer>
    )
}

export default SideNavbar;