import { useNavigate } from "react-router";

function Input({setVid, vid}) {
    const navigate = useNavigate()
    return (
        <div className="Input w-full h-full flex flex-col justify-center items-center" >
            <input 
                type="file"
                accept="video/*"
                className="!cursor-pointer text-center flex justify-center items-center appearance-none" 
                style={{

                }}
                onInput={(e)=>{
                    let file = e.target.files[0];
                    let url = window.URL.createObjectURL(file);
                    setVid({name:file.name, url, type:"file"})
                }}
                 />
                 <h1 className="my-8">- OR -</h1>
                 {/* via url */}
                 <form className="flex input-group items-center justify-center" onSubmit={(e)=>{e.preventDefault();navigate(`?${e.target.input.value}`)}}>
                     <input type="text" id="input" placeholder="Enter Url" className="input input-ghost bg-slate-500 !text-white " min="10" required />
                     <button className="btn btn-square btn-accent">GO!</button>
                 </form>
        </div>
    );
}

export default Input;
// https://a9-ny8-s-9m8v.vdst.one/dl/9c2a9c58095dd366WLqUJFlIn6933vQGS.DSXqsG%7CqFFaBJ8-I-0y6-Q__.MHV5bkxsbjh3RGNjMEZDeXZzeElSSll1QTVPaWtRUjZ2RVRmbHFOYzRNRVVvMkNHeGxBMUxFUklwSmtMUWZtR0hjWVI3MGEwZU14Q2l3cWViV09HR01ZM2dxcGZkdFNwUkxaeUZkcDN5U1hrb2wwVFlocWVNSldSL1VmNjRjMk9UR2ZSamUvdkJQeEgzZkJmNnZOaDd5ZTRSeTNLSkV5Z3Vic1hSY1AzT1hUOVlSQmlxZFljMEpoY3g1MHl5YjkxZUJ6WjBWQmJLNmdoampEZXZQSE9yZ1ZRS3FydlpKNzRUaWMwN1Babm83WENDTkp5VHZFdGZwRnNrLzlpY3JPQlMzdWJybTdSV0NUY2NoZWdwRDA4WE9aWTNyYys3SCtmT0t3TStrU1Nhb21WUG5hSW1uc0FQb2VmVy9Od3Q3LzNSTG1KdCt3cUxYVWJjMGp5NXNWbVdGZVBmQm1DaW54S3Zrb3hWVmtVNkl1UmRSR1RldXhCY0wwai9xRnRWMkRpb3EwRjZxQ05JMFZaZG5iSUh1cWRxY2tZN3VGM1JFQkU5SGlwKzF2SXhUYzErM1E9