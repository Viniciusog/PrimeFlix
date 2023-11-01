import { useState, useEffect } from 'react';
import API from '../../source/axios'

const useFetchLocal = <T> (url : string, param ?: string) => {
    const [data, setData] = useState<T | null>();
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        API.get(url,{
            headers : {
                'Authorization' : localStorage.getItem('ACCESS_TOKEN')
            }
        })
        .then(res => {
            if(param){
                setData(res.data[param])
            }else{
                setData(res.data)
            }
            console.log(data);
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            setIsLoading(false)
        });
        
    }, [url]);
    return [data, isLoading] as const;
}

export default useFetchLocal; 