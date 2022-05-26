export function filterObject(obj, callback) {
    return Object.fromEntries(Object.entries(obj).
      filter(([key, val]) => callback(val, key)));
}

export function toggleBool(val, cb=()=>{}){
    try {
        if(val === true){
            return false;
            cb(val);
        }else if (val === false){
            return true;
            cb(val);
        }else{
            throw new Error("the value isn't boolean")
        }
    } catch (error) {
        throw new Error(error);
    }
}

export function msToTime (num){
    let seconds = 0;
    let minutes = 0;
    let allMinutes = 0;
    let hours = 0;
    let allHours = 0;
    let days = 0;

    
    seconds = num % 60;
    allMinutes = (num - seconds) / 60; 
    minutes = allMinutes % 60; 
    allHours = (allMinutes - minutes) / 60;
    hours = allHours % 24;
    days = (allHours - hours) / 24

    return {
        seconds: Math.floor(seconds), 
        minutes,
        hours,
        days,
    }
}


export function prettyTime(D){
    D = msToTime(D);
    if(D.seconds.toString().length == 1){
        D.seconds = `0${D.seconds}`;
    }
    if(D.days > 0){
        return `${D.days}:${D.hours}:${D.minutes}:${D.seconds}`
    }else if(D.hours > 0){
        return `${D.hours}:${D.minutes}:${D.seconds}`
    }else if(D.minutes.toString().length == 1){
        return `${D.minutes}:${D.seconds}`
    }
}
export function percentageFromBoth(
    FST={
        from:  100,
        all: 200
    },
    SST={
        from: null,
        all: 3000
    }
) {
    return (FST.from * SST.all) / FST.all
}

export async function copyTextToClipboard(text) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
        try{
            return await document.execCommand('copy', true, text);
        } catch {
            try{
                await window.clipboardData.setData("Text", text)
            } catch(err){
                console.warn(err)
            }
        }
    }
  }