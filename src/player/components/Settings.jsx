import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { filterObject } from "../../utils";

const Settings = ({setSettings, settingsRef}) => {
    // console.log(settingsRef.current.showTimelineProgress)
    // useEffect(()=>{console.log(settingsRef.current)}, [settingsRef])
    return (
        <div className="w-full h-full absolute top-0 left-0 bg-transparent grid place-items-center">
            <div className="bg-white p-4 border-4 border-gray-700 rounded-lg text-black">
                <div className="topHeader flex flex-col justify-center items-center mb-8">
                    <h1 className="flex ">Settings
                        <small className="block text-right text-sm font-medium text-gray-400">BETA</small>
                    </h1>
                </div>
                {/* we filter "Isopened" bcz it is a way to declare wether the settings panel is opened or not. */}
                {Object.keys(filterObject(settingsRef.current, (val, key) => key != "isOpened" )).map((key, idx)=>{
                    let settings = settingsRef.current;

            return <div className="w-full h-full flex justify-between items-center my-1 text-lg">
            {/* return <div key={uuidv4()} className="w-full h-full flex justify-between items-center my-2"> */}
                        {(()=>{
                            let text = key.match(/[A-Z]/g);
                            let newText = key;
                            text.map((item)=>{
                                newText = newText.replaceAll(item, ` ${item.toLowerCase()}`)
                            })
                            return newText
                        })()}
                        {   settings[key].type === "boolean" ? 
                            <input type="checkbox" className='toggle toggle-accent ml-6' defaultValue={settings[key].value} checked={settings[key].value} onChange={(e)=>{setSettings({...settingsRef.current, [key]:{...settings[key], value: e.target.checked} });console.log(e.target.checked)}} /> : 
                            settings[key].type === "number" ? 
                            <input type="number" defaultValue={settings[key].value} step={settings[key].step} max={settings[key].max} min={settings[key].min} className="input input-bordered focus:input-accent ml-6"  onInput={(e)=>{setSettings({...settingsRef.current, [key]:{...settings[key], value: e.target.value} })}}/> : 
                            settings[key].type === "color" && 
                            <input type="color" defaultValue={settings[key].value} className="input input-bordered focus:input-accent ml-6 cursor-pointer px-1" onInput={(e)=>{setSettings({...settingsRef.current, [key]:{...settings[key], value: e.target.value} })}} />
                        }

                    </div>
                })}
                <div className="grid place-items-center mt-6">
                    <span className="btn btn-outline btn-success" onClick={()=>{setSettings({...settingsRef.current, isOpened: false})}}>Done</span>
                </div>
            </div>
        </div>
    )
}
export default Settings;