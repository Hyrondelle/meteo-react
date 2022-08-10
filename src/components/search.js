import React,{useState,useEffect} from 'react';
import axios from 'axios';

const Search = () => {
    const [citySearch, setCitySearch] = useState('Rennes');
    const [codeInsee, setCodeInsee] = useState('35238');
    const [weather, setWeather] = useState(null);
    useEffect(() => {
        
        axios.get('https://api.meteo-concept.com/api/forecast/daily/0/periods/?token=9b01db3accf07d2a4792726c45ffe29b9a19b6e1351743562e4ef1ef868d90e3&insee='+codeInsee,
        )
        .then(res =>setWeather(res))
        .catch(err =>console.log(err))
      },[codeInsee]);
    useEffect( () =>{
        axios.get('https://api.meteo-concept.com/api/location/cities?token=9b01db3accf07d2a4792726c45ffe29b9a19b6e1351743562e4ef1ef868d90e3&search='+citySearch,
        )
        .then(res =>setCodeInsee(res.data.cities[0].insee))
        .catch(err =>console.log(err))
    },[citySearch]);
    
    return (
        <div className='search'>
            <input onChange={(e)=> setCitySearch(e.target.value)} type='text'></input>
            <div className='result'>
                <div className='nuit'>
                    <h3>nuit:</h3>
                    <p>{weather==null?0:weather.data.forecast[0].temp2m}</p>
                </div>
                <div className='matin'>
                <h3>matin:</h3>
                    <p>{weather==null?0:weather.data.forecast[1].temp2m}</p>
                </div>
                <div className='aprem'>
                <h3>après-midi:</h3>
                    <p>{weather==null?0:weather.data.forecast[2].temp2m}</p>
                </div>
                <div className='soir'>
                <h3>soir:</h3>
                    <p>{weather==null?0:weather.data.forecast[3].temp2m}</p>
                </div>
            </div>
        </div>
    );
};

export default Search;