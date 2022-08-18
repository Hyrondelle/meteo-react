import React,{useState,useEffect} from 'react';
import axios from 'axios';
import sun from '../images/sun.png';
import rain from '../images/small_rain.png';
import loading from '../images/loading.png';
import sunsmall from '../images/sun_small_cloud.png';
import sunbig from '../images/sun_big_cloud.png';
import cloud from '../images/cloud.png';
import cloudwind from '../images/cloud_wind.png';
import snowlittle from '../images/snow_little.png';
import snowbig from '../images/snow_big.png';
import orage from '../images/orage.png';
import oragebig from '../images/big_orage.png';

const Search = () => {
    const [citySearch, setCitySearch] = useState('Rennes');
    const [codeInsee, setCodeInsee] = useState('35238');
    const [weather, setWeather] = useState(null);
    const d = new Date();
    useEffect(() => {
        
        axios.get('https://api.meteo-concept.com/api/forecast/daily/0/periods/?token=9b01db3accf07d2a4792726c45ffe29b9a19b6e1351743562e4ef1ef868d90e3&insee='+codeInsee,
        )
        .then((res) =>{setWeather(res);console.log(res)})
        .catch(err =>console.log(err))
      },[codeInsee]);
    useEffect( () =>{
        axios.get('https://api.meteo-concept.com/api/location/cities?token=9b01db3accf07d2a4792726c45ffe29b9a19b6e1351743562e4ef1ef868d90e3&search='+citySearch,
        )
        .then(res =>setCodeInsee(res.data.cities[0].insee))
        .catch(err =>console.log(err))
    },[citySearch]);
    
    const DayImages = (n) =>{
        switch(weather.data.forecast[n].weather){
            case 0: return sun;
                    break;
            case 1:
            case 2: return sunsmall;
                    break;
            case 3:
            case 4: return sunbig;
                    break;
            case 5: return cloud;
                    break;
            case 6:
            case 7: return cloudwind;
                    break;
            case 10:
            case 11:
            case 12:        
            case 40:  
            case 41: 
            case 42: 
            case 43: 
            case 44: 
            case 45: 
            case 46: 
            case 47: 
            case 48:
            case 210: 
            case 211:
            case 212: return rain;
                      break;
            case 13:
            case 14:        
            case 15: 
            case 16: 
            case 20:
            case 30:
            case 61:
            case 63:
            case 64:
            case 220:
            case 221: return snowlittle;
                      break;
            case 21: 
            case 22:
            case 31:
            case 32:
            case 62:
            case 65:
            case 26: 
            case 67:
            case 68:
            case 70:
            case 71: 
            case 72:
            case 73:
            case 74:
            case 75:
            case 76:
            case 77: 
            case 78:
            case 222:
            case 230:
            case 231:
            case 232:
            case 235:return snowbig;
                    break;
            case 100:
            case 101:
            case 103:        
            case 104:  
            case 106: 
            case 120: 
            case 121: 
            case 122: 
            case 123: 
            case 124: 
            case 125: 
            case 126:
            case 140: 
            case 141: 
            case 142:  return orage;
                      break;
            case 102:
            case 105:
            case 107:        
            case 108:  
            case 127: 
            case 128: 
            case 130: 
            case 131: 
            case 132: 
            case 133: 
            case 134: 
            case 135: 
            case 136: 
            case 137: 
            case 138: return oragebig;
                      break;
            default : return sun; 
                      break;           
        }
    }
    return (
        <div className='search'>
            <input onChange={(e)=> setCitySearch(e.target.value)} type='text'></input>
            <p>{d.toLocaleDateString()}</p>
            <p className='name'>{weather==null?'Rennes':weather.data.city.name}</p>
            <div className='result'>
                <div className='nuit'>
                    <h3>nuit:</h3>
                    <img className='photo' src={weather==null?loading:DayImages(2)}></img>
                    <p>{weather==null?0:weather.data.forecast[0].temp2m}</p>
                </div>
                <div className='matin'>
                    <h3>matin:</h3>
                    <img className='photo' src={weather==null?loading:DayImages(1)}></img>
                    <p>{weather==null?0:weather.data.forecast[1].temp2m}</p>
                </div>
                <div className='aprem'>
                    <h3>après-midi:</h3>
                    <img className='photo' src={weather==null?loading:DayImages(2)}></img>
                    <p>{weather==null?0:weather.data.forecast[2].temp2m}</p>
                </div>
                <div className='soir'>
                    <h3>soir:</h3>
                    <img className='photo' src={weather==null?loading:DayImages(3)}></img>
                    <p>{weather==null?0:weather.data.forecast[3].temp2m}</p>
                </div>
            </div>
        </div>
    );
};

export default Search;