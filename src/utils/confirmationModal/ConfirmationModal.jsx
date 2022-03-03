import { useEffect, useRef } from "react";

function ConfirmationModal({title="Are you sure you want to do that?!", acceptEvent = ()=>{}, denyEvent=()=>{}, setPopup}) {
    const popup = useRef();
    useEffect(()=>{
        if(setPopup) return;
        setPopup = ()=>{popup.current.remove()};
    }, [])
    return (
        <div className="absolute w-[100vw] h-[100vh] top-0 left-0 backdrop-filter backdrop-brightness-50 grid place-items-center " ref={popup}>
            <div className="rounded-md p-6 bg-white text-black text-">
                <h2 className="mb-12">{title}</h2>
                <hr />
                <div className="mt-6">
                    <button className="btn btn-success btn-outline mr-2" onClick={()=>{acceptEvent(); setPopup()}}>Accept</button>
                    <button className="btn btn-error hover:bg-[#fef3c8]" onClick={()=>{denyEvent(); setPopup()}}>Deny</button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationModal;