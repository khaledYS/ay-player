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