import { Grid, GridItem,Flex,Icon,Text,Avatar,Button } from '@chakra-ui/react';
import {GiHamburgerMenu} from 'react-icons/gi';

const TopNavbar=({passRef,openSideBar})=>{
    
    return(
        <Grid>
            <Flex justifyContent={'space-between'}>

             <GridItem>
                <Button
                 ref={passRef}
                 onClick={()=>openSideBar()}
                 backgroundColor={'transparent'}
                >
                 <Icon as={GiHamburgerMenu} boxSize={10} />
                </Button>
             </GridItem>

             <GridItem>
                  <Text fontSize='4xl'>
                     VidoPlex
                  </Text>
             </GridItem>

             <GridItem>
                <Avatar
                name={'Nikola Jokic'}
                m='2'
                />
             </GridItem>

            </Flex>
        </Grid>
    )
}

export default TopNavbar;