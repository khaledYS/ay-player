import { useEffect, useRef, useState } from "react";
import { Outlet, useHref, useInRouterContext, useLocation, useNavigate, useOutletContext, useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import Input from "./components/Input";
import Settings from "./components/Settings";
import Video from "./components/Video";

function Player() {
    const [vid, setVid] = useState();
    const urlParams = useLocation(); 
    const navigate = useNavigate();

    useEffect(()=>{
        if(urlParams?.search.length > 1){
            setVid(
                {
                    url: urlParams.search.replace("?", ""),
                    name: "Anonymouse url", 
                    type: "url"
                }
            )
        }
    }, [urlParams])
    useEffect(()=>{
        if(vid?.url === false){
            console.log(vid)
            navigate("")
        }
    }, [vid])

    // this has to props first one is the boolean so it indicates wether it is open or not,
    //  the second value which is object and it indicates the settings.
    const [settings, _setSettings] = useState({
        isOpened: false,
        showTimelineProgress : {
            type: "boolean", 
            value: false
        },
        changeVolumeBy : {
            type: "number",
            min: "0.01",
            max: "0.5",
            step: "0.01",
            value: "0.1"
        },
        backgroundColor: {
            type: "color",
            value: "black"
        }
    })
    const settingsRef = useRef(settings);
    const setSettings = (data)=>{
        settingsRef.current = data;
        _setSettings(data);
    }

    return ( 
        <div className="Player w-full h-full bg-[#394E60] text-white text-2xl relative">
            {vid?.url ? <Video vid={vid} setVid={setVid} setSettings={setSettings} settingsRef={settingsRef} /> : <Input vid={vid} setVid={setVid} />}
            {settingsRef.current.isOpened && vid && <Settings setSettings={setSettings} settingsRef={settingsRef} />}
        </div>
     );
}

export default Player;