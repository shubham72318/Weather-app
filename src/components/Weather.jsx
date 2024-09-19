import React, { useState } from 'react'
import { FaSearchLocation } from "react-icons/fa";
import cloud from "../images/Clouds.png"
import rain from "../images/Rain.png"
import clear from "../images/Clear.png"
import mist from "../images/mist.png"
import err from "../images/error.png"
const Weather = () => {
    const[search,setSearch] = useState("");
    const[data,setData] = useState();
    const[error,setError] = useState();
    const API_KEY = "29ddbbafc315b49a22bb40b34d95d415"
    const API = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}"
    const handleInput = (event) =>{
        setSearch(event.target.value);
      }
      //let me make a function to fetch apu data 
      const myFun = async()=>{
        const get = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`)
        const jsonData = await get.json();
        console.log(jsonData);
        setData(jsonData);
        if(search==""){
         setError("please enter name")
        }
        else if(jsonData=='404'){
          setError("please enter valid name!")
        }
        else{
          setError("")
        }
     setSearch("")
      }
      
     
  return (
   <>
<div className="flex flex-col justify-center items-center min-h-screen bg-blue-100">
  <div className="flex items-center bg-pink-200 p-4 rounded-lg shadow-lg w-full max-w-md">
    <input 
      type="text" 
      placeholder="Enter city name" 
      className="border border-gray-300 rounded-l-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      onChange={handleInput}
      value={search}
    />
    <button onClick={myFun}
      className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 focus:outline-none flex items-center"
    >
      <FaSearchLocation className="text-xl" />
    </button>
  </div>
  <div  className="flex justify-center items-center bg-pink-200 p-4 rounded-lg shadow-lg w-full max-w-md mt-4">
  {
                error ?
                <div className='errorPage'>
                    <p>{error}</p>
                    <img src={err}/>
                </div> : ""
            }
   
   
   {
     data && data.weather ?
     <div>
      <h2>{data.name}</h2>
      <img src={data.weather[0].main == "Clouds" ? cloud : "" }/>
      <img src={data.weather[0].main == "Rain" ? rain : "" }/>
                    <img src={data.weather[0].main == "Clear" ? clear : "" }/>
                    <img src={data.weather[0].main == "Mist" ? mist : "" }/>
                    <img src={data.weather[0].main == "Haze" ? cloud : "" }/>
      <h2>{data.main.temp}°C</h2>
      <h2>{data.weather[0].description}</h2>
     </div>:""
   }
  </div>
 </div>
    


   </>
  )
}

export default Weather
