import { Button } from "@chakra-ui/react";
import Cookies from 'js-cookies';
import { useRouter } from "next/router";

const Profile=()=>{
    const router = useRouter();
    const selectProfile=()=>{
        Cookies.setItem('profile','test');
        router.push('/home');
    }
    return(
        <div>
            Profile Page
            <Button onClick={()=>selectProfile()}>
                Profile
            </Button>
        </div>
    )
}

export default Profile;