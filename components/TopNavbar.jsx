import { Grid, GridItem,Icon,Text,Button } from '@chakra-ui/react';
import {GiHamburgerMenu} from 'react-icons/gi';

const TopNavbar=({passRef,openSideBar})=>{
    
    return(
        <Grid>

        <GridItem>       
         <Button
            ref={passRef}
            onClick={()=>openSideBar()}
            backgroundColor={'transparent'}
          >
         <Icon 
           as={GiHamburgerMenu} 
           boxSize={7} 
          />
        </Button> 
        </GridItem>

        <GridItem>
        <Text 
        textAlign={'center'}
           fontSize={['3xl',null,'3xl','4xl','5xl']}
           >
             VidoPlex
           </Text>
        </GridItem>

        </Grid>
    )
}

export default TopNavbar;