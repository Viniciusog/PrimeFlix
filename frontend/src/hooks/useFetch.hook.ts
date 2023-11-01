import { useState, useEffect } from 'react';
import {axiosInstance} from './axiosInstance'

const useFetch = <T> (url : string, param ?: string, page? : string) => {
    const [data, setData] = useState<T | null>();

    useEffect(() => {
        axiosInstance.get(url,{
            params : {
                'page' : page ? page : '1'
            }
        })
        .then(res => {
            if(param){
                setData(res.data[param])
            }else{
                setData(res.data)
            }
        }).catch(err => {
            console.log(err)
        });
    }, [url]);
    return [data] as const;
}

export default useFetch; 
