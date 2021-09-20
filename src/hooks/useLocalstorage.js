import React,{useEffect,useState} from 'react'

function getStorageValue(key,defaultValue){
    
        //getting stored value from localstrorage
        const saved = localStorage.getItem(key)
        const initialValue = JSON.parse(saved)

        return initialValue || defaultValue;
}

export const useLocalstorage = (key,defaultValue) => {
    const [value,setValue] = useState(() => {
        return getStorageValue(key,defaultValue)
    })

    useEffect(() => {
        //storing friends name
        localStorage.setItem(key,JSON.stringify(value))
    }, [key,value])
    
    return [value,setValue]
}
