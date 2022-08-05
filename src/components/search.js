import React,{useState,useEffect} from 'react';
import axios from 'axios';

const Search = () => {
    const [citySearch, setCitySearch] = useState('');
    useEffect(() => {
        
        axios.get('https://api.meteo-concept.com/api/forecast/daily?token=9b01db3accf07d2a4792726c45ffe29b9a19b6e1351743562e4ef1ef868d90e3&search=Rennes',
        )
        .then(res =>console.log(res))
        .catch(err =>console.log(err))
      },[]);
    return (
        <div className='search'>
            <input onChange={(e)=> setCitySearch(e.target.value)} type='text'></input>
        </div>
    );
};

export default Search;