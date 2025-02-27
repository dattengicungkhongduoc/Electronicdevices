export const  isJsonString = (data)=>{
    try{
        JSON.parse(data)
    }catch(e){
        return false;
    }
    return true;
}

export const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}
