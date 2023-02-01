import '@vime/core/themes/default.css';
import { Player,Video,DefaultUi,DefaultControls} from '@vime/react';

const CustomPlayer=({video})=>{
    return(
        <Player
        >
            <Video 
             poster={video?.thumbnail2?.url}
            >
            <source
             data-src={video?.mp4?.url}
             type="video/mp4"
            />
            </Video>
            <DefaultUi 
            noControls>
       
        <DefaultControls />
      </DefaultUi>
    </Player>
    )
}

export default CustomPlayer;