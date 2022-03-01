function Input({setVid, vid}) {
    return (
        <div className="Input w-full h-full grid place-items-center " >
            <input 
                type="file"
                accept="video/*"
                className="cursor-pointer"
                onInput={(e)=>{
                    let file = e.target.files[0];
                    let url = window.URL.createObjectURL(file);
                    setVid({name:file.name, url})
                    console.log(url, file)
                }}
                 />
        </div>
    );
}

export default Input;