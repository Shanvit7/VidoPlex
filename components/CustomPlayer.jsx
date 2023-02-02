import '@vime/core/themes/default.css';
import {Player,Video,DefaultUi,DefaultControls,} from '@vime/react';
import { useState, useRef, useEffect } from 'react';  
import { useMyWatchHistoryQuery } from '../redux/services/userService';
import { useUpdateMyWatchHistoryMutation } from '../redux/services/userService';

const CustomPlayer=({video})=>{
    const playerRef = useRef(null);
    const currentTimeRef = useRef();
    const {data:myWatchHistory={},refetch:refetchMyWatchHistory} = useMyWatchHistoryQuery();
    const [updateMyWatchHistory]=useUpdateMyWatchHistoryMutation();
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(()=>{
        currentTimeRef.current = currentTime;
    },[currentTime])

    useEffect(()=>{
        if(myWatchHistory){
            myWatchHistory.data?.map((alreadySeenvideo)=>{
                if(alreadySeenvideo.id===video.id){
                    setCurrentTime(alreadySeenvideo?.currentTime);
                }
            })
        }
    },[myWatchHistory.data]);

    useEffect(()=>{
        return()=>{
            const updatedVideo = Object.assign({},video,{currentTime:currentTimeRef.current})
            updateMyWatchHistory(updatedVideo);
        }
    },[])

    
    const onTimeUpdate = (event) => {
        setCurrentTime(event.detail);
    };

    return(
        <Player
         ref={playerRef}
         currentTime={currentTime} 
         onVmCurrentTimeChange={onTimeUpdate}
        >
            <Video 
             poster={video?.thumbnail2?.url}
             title={video?.title}
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