import axios from 'axios';
import { useEffect,} from "react";

const Home=()=>{
   useEffect(() => {
    (async () => {
        axios.get("/api/test").then((res)=>{
          console.log(res);
        })
     
    })();
}, []);


  return (
    <div>
      VidoPlex Coming soon
    </div>
  )
}

export default Home;