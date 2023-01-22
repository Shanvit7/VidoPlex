import { Grid, GridItem,Icon,Button } from '@chakra-ui/react';
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

        </Grid>
    )
}

export default TopNavbar;