import { useEffect, useRef, useState } from "react";
import ConfirmationModal from "../../utils/confirmationModal/ConfirmationModal";
import { BsPauseBtn, BsPlayBtn } from "react-icons/bs"
import { BiVolumeMute, BiVolume, BiTrendingUp } from "react-icons/bi"
import { FiSettings, FiVolume, FiVolume1, FiVolume2, FiVolumeX } from "react-icons/fi"
import { toggleBool } from "../../utils";
function Video({vid, setVid, settingsRef, setSettings}) {
    const [popup, setPopup] = useState(false);
    const [videoState, setVideoState] = useState(false);
    const [videoIsLoading, setVideoIsLoading] = useState(true);
    const [videoErorr, setVideoError] = useState(false);


    // states can be changed even if its in a listener;
    const [volume, _setVolume] = useState(0.5)
    const volumeRef = useRef(volume);
    const setVolume = (data)=>{
        volumeRef.current = data;
        _setVolume(data);
    }

    const [muted, _setMuted] = useState(true)
    const mutedRef  = useRef(muted);
    const setMuted = (data)=>{
        mutedRef.current = data;
        _setMuted(data);
    }


    const vidEl = useRef();
    const inputEl = useRef()
    let mounted = useRef(false);

    useEffect(()=>{
        setVolume(volumeRef.current)
        setMuted(mutedRef.current)
    }, [mutedRef, volumeRef])

    useEffect(()=>{
        mounted.current = true;

        
        function update(){
            
            function updateRangeInput(){
                if(!mounted.current) return ;
                inputEl.current.value = vidEl.current.currentTime;
            }
            
            // handle keyboard shortcuts
            window.addEventListener("keydown", (e)=>{
                if(!mounted.current) return ;
                
                const changeCurrentTime = (vid, currentTime) =>{
                    vid.currentTime = currentTime;
                    inputEl.current.value = vidEl.current.currentTime;
                    setVideoIsLoading(true);
                }
                
                let code = e.code,
                key = e.key,
                kc = e.keyCode;
                
                // toggle settings panel 
                if(kc == 83){
                    vidEl.current.pause()
                    setSettings({...settingsRef.current, isOpened: toggleBool(settingsRef.current.isOpened)});
                }
                // handle esc button
                if(key == "Escape"){
                    setPopup(true)
                }
                // if the settings panel is open or there is an error in the video, don't activate any of video keyboard shortcuts.
                if(settingsRef.current.isOpened) return;
                if(videoErorr) return;                
                
                
                // handle moving the current time
                // '
                if(kc == 222){
                    changeCurrentTime(
                        vidEl.current,
                        vidEl.current.currentTime + 60
                    )
                }
    
                // ;
                if(kc == 186){
                    changeCurrentTime(
                        vidEl.current,
                        vidEl.current.currentTime + 20
                    )
                }
                // l
                if(kc == 76 || kc == 39){
                    changeCurrentTime(
                        vidEl.current,
                        vidEl.current.currentTime + 5
                    )
                }
                // j
                if(kc == 74){
                    changeCurrentTime(
                        vidEl.current,
                        vidEl.current.currentTime - 20
                    )
                }
                // l
                if(kc == 75 || kc == 37){
                    changeCurrentTime(
                        vidEl.current,
                        vidEl.current.currentTime - 5
                    )
                }
                // h
                if(kc == 72){
                    changeCurrentTime(
                        vidEl.current,
                        vidEl.current.currentTime - 60
                    )
                }
                
                
                // handle stop and play 
                // space
                if(kc == 32){
                    vidEl.current.paused ? vidEl.current.play() : vidEl.current.pause();
                }
                
                if(e.code == "KeyM"){
                    if(mutedRef.current){
                        setMuted(false)
                    }else{
                        setMuted(true)
                    }
                }
    
                // // volumeUp : i,arrowUP
                if(kc == 73 || kc == 38){
                    let newVol = volumeRef.current + Number(settingsRef.current.changeVolumeBy.value);
                    if(newVol > 1){
                        newVol = 1;
                    }
                    setVolume(newVol);
                }
                // volumeDown : n, arrowDown
                if(kc == 78 || kc == 40){
                    let newVol = volumeRef.current - Number(settingsRef.current.changeVolumeBy.value);
                    if(newVol < 0){
                        newVol = 0;
                    }
                    setVolume(newVol);
                }
    
    
    
            }, true)
            
            vidEl.current.onerror = function(e) {
                setVideoError(e.target.error);
            }
            vidEl.current.onwaiting = function() {
                setVideoIsLoading(true)    
            }
            vidEl.current.onsatlled = function() {
                setVideoIsLoading(true)    
            }
            vidEl.current.addEventListener("canplay",()=>{
                setVideoIsLoading(false);
            })
            vidEl.current.addEventListener("loadeddata", (e)=>{
                mounted.current = true;
    
                inputEl.current.setAttribute("max", vidEl.current.duration);
                updateRangeInput()
                
                // when the video current time changes, change the value of the range input
                vidEl.current.ontimeupdate = updateRangeInput;
                
                // when the vid is true;
                vidEl.current.onpause = ()=>{setVideoState(false)}
                vidEl.current.onplay = ()=>{setVideoState(true)}
                
                
                
                // when a user changes the value of the range, change the video current tiem
                inputEl.current.oninput = (e)=>{
                    vidEl.current.currentTime = Number(e.target.value);
                    setVideoIsLoading(true)
                }
                
    
    
            

            }, true);    
        }

        if(mounted.current){
            update()
        }else {
        }

        return ()=>{
            mounted.current = false;
        }
    }, [])

    useEffect(()=>{
        if(volume > 0 && volume <= 1){
            setMuted(false)
            vidEl.current.volume = volume;
        }else if (volume == 0) {
            setMuted(true)
        }else{
            setVolume(1);
        }
    }, [volume])

    useEffect(()=>{
        if(muted == false){
            vidEl.current.volume = volume;
            if(volume == 0){
                setVolume(0.3)
            }
        }else{
            vidEl.current.volume = 0;
        }
    }, [muted])

    useEffect(()=>{
        if(videoErorr){
            window.alert(`Error: ${videoErorr.message}, code: ${videoErorr.code}`)
        }
    }, [videoErorr])

    return (
        <div className="w-full h-full grid place-items-center relative" style={{backgroundColor:settingsRef.current.backgroundColor.value}}>
            <div className="vid-contianer relative overflow-hidden w-full aspect-auto ">

                <video 
                    src={vid.url} 
                    className=" aspect-auto max-h-[100vh] h-full w-full"
                    ref={vidEl}
                    ></video>

                {/* loading screen for vid */}
                {
                    videoIsLoading &&
                    <div className="absolute top-0 left-0 w-full h-full grid place-items-center backdrop-brightness-[.4] backdrop-filter">
                        <div className="lds-ripple"><div></div><div></div></div>
                    </div>
                }

                {/* upper nav */}
                <div className="upper-nav-container absolute top-0 left-0 w-full block transform pb-20 transition-transform -translate-y-[60%] hover:translate-y-[0%]">
                    <div className=" upper-nav flex items-center justify-between p-2 bg-black text-sm">
                        <h1 className="p-2">{vid.name}</h1>
                        <div className="p-2 block">
                            <FiSettings className="block hover:text-gray-300 cursor-pointer" onClick={()=>{setSettings({...settingsRef.current, isOpened: true})}} />
                        </div>
                    </div>
                </div>

                {/* controllers */}
                <div className={`controls absolute bottom-0 left-0 w-full block transform transition-all pt-12 ${settingsRef.current.showTimelineProgress.value ? "translate-y-[50%]" : "translate-y-[60%]"} hover:translate-y-[0%]`}>
                    <div className="w-full h-full flex flex-col bg-[#000000ab] backdrop-filter backdrop-opacity-25 relative ">

                        <input ref={inputEl} type="range" className="customeVidRange m-0 rounded-none !text-black !shadow-md absolute top-0 transform -translate-y-full" tabIndex="-1" />

                        <div className="flex justify-center items-center mt-2 mb-1 text-4xl ">
                            <div className="left-side flex items-center justify-end" style={{flexBasis: "100%"}}>
                                {/* play pause button */}
                                <div className="cursor-pointer" onClick={()=>{vidEl.current.paused ? vidEl.current.play() : vidEl.current.pause()}}>
                                    {videoState ? <BsPauseBtn /> : <BsPlayBtn />}
                                </div>
                            </div>
                            <div className="right-side  flex items-center justify-start" style={{flexBasis: "100%"}}>
                                {/* volume button */}
                                <div className="ml-6 volume-input-container flex justify-center items-center ">
                                    <div className=" cursor-pointer" onClick={()=>{muted ? setMuted(false) : setMuted(true)}}>
                                    {/* FiVolume1, FiVolume2, FiVolumeX */}
                                        {muted ? <FiVolumeX /> : 
                                            volume <= 0.3 ? <FiVolume /> : 
                                            volume > 0.3 && volume <= 0.6 ? <FiVolume1 /> :
                                            <FiVolume2 />
                                        }

                                    </div>

                                    <input type="range" className="ml-2 volume-input" step=".0000001" value={`${volume}`} tabIndex="-1" max="1" min="0" onInput={(e)=>setVolume(Number(e.target.value))}/>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>


            </div>

            {
                popup && <ConfirmationModal
                            title="Are you sure want to Exit this video?!"
                            acceptEvent={()=>{
                                setVid()
                            }}
                            setPopup={setPopup}
                            />
            }

        </div>
    );
}

export default Video;
/**
 * BiVolumeMute
 * BiVolume
 * BiVolume1
 * BiVolume2
 * 
 * 
 */