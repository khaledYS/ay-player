import { useRef, useState } from "react";
import { Outlet } from "react-router";
import Input from "./components/Input";
import Settings from "./components/Settings";
import Video from "./components/Video";

function Player() {
    const [vid, setVid] = useState();

    // this has to props first one is the boolean so it indicates wether it is open or not,
    //  the second value which is object and it indicates the settings.
    const [settings, _setSettings] = useState({
        isOpened: true,
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
        }
    })
    const settingsRef = useRef(settings);
    const setSettings = (data)=>{
        settingsRef.current = data;
        _setSettings(data);
    }

    return ( 
        <div className="player w-full h-full bg-dark-50 text-white relative">
            {vid ? <Video vid={vid} setVid={setVid} setSettings={setSettings} settingsRef={settingsRef} /> : <Input vid={vid} setVid={setVid} />}
            {settingsRef.current.isOpened && vid && <Settings setSettings={setSettings} settingsRef={settingsRef} />}
        </div>
     );
}

export default Player;