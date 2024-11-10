import { useContext ,createContext,useState, useEffect} from "react";
import axios from "axios";

const StateContext = createContext()

export const StateContextProvider = ({children}) => {

    const [weather,setWeather] = useState({})

    const [values,setValues] = useState([])

    const [place,setPlace] = useState('Ruston')
    const [thisLocation,setLocation] = useState('')
    const [airQuality, setAirQuality] = useState(null);
    const [pollen1,setPollen1]=useState(null);
    const [pollen2,setPollen2]=useState(null);
    const [pollen3,setPollen3]=useState(null);

    //fetch  weather api

    const fetchWeather = async() => {
        const options = {
            method : 'GET',
            url : 'https://visual-crossing-weather.p.rapidapi.com/forecast',

            params : {
                aggregateHours : '24',
                location : place,
                contentType : 'json',
                unitGroup: 'us',
                shortColumnNames: 0,
            },

            headers : {
                'X-RapidAPI-Key' : import.meta.env.VITE_API_KEY,
                'X-RapidAPI-Host' : 'visual-crossing-weather.p.rapidapi.com'
            }
        }


        try{
            const response = await axios.request(options);
            console.log(response.data)
            const thisData = Object.values(response.data.locations)[0]

            //extract latitude and longitude
            const { latitude, longitude} = thisData ; 

            setLocation(thisData.address)
            setValues(thisData.values)
            setWeather(thisData.values[0])
            
            // Fetch air quality using latitude and longitude
            fetchAirQuality(latitude, longitude);
            //Fetch Pollen Api 
            fetchPollen(latitude,longitude);

        }catch(e){
            console.error(e);
            //if the api throws error.
            alert('This place does not exist')
        }
    } 

    // Fetch API for air quality
    const fetchAirQuality = async (lat, lng) => {
        const apiKey =  import.meta.env.VITE_AIR_QUALITY_API_KEY
        const url = `https://airquality.googleapis.com/v1/currentConditions:lookup?key=${apiKey}`

        const payload = {
            location: {
                latitude: lat,
                longitude: lng
            }
        };

        axios.post(url, payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log(response.data);
            // console.log(response.data.indexes[0].category)
            setAirQuality(response.data.indexes[0].category);
        })
        .catch(error => {
            console.error(`Error: ${error.response.status}`);
            setAirQuality(null);
        })
        
        // const airQualityUrl = "https://airquality.googleapis.com/v1/currentConditions:lookup?key=AIzaSyCdlzvRBdqKWcjB1hyjDwZ2eCpxwHoeFV0"; // google air quality API URL
        // console.log(lat);
        // const options = {
        //     method: "POST",
        //     url: airQualityUrl,
        //     params: {
        //         "location" : {
        //             "latitude" : lat,
        //             "longitude" : lng
        //         }
        //     },
        //     // headers: {
        //     //   Authorization: `Bearer ${import.meta.env.VITE_AIR_QUALITY_API_KEY}`,
        //     // }

            
        // }
        // try {
        //     const response = await axios.request(options);
        //     console.log("Air Quality Data:", response.data);
        //     setAirQuality(response.data); // Set air quality data
        // } catch (error) {
        //     console.error("Error fetching air quality:", error);
        //     setAirQuality(null); // Reset air quality data if error occurs
        // }
    }
    // Fetch API for air quality
    const fetchPollen = async (lat, lng) => {
        const apiKey = import.meta.env.VITE_AIR_QUALITY_API_KEY
        const url = `https://pollen.googleapis.com/v1/forecast:lookup?key=${apiKey}&location.longitude=${lng}&location.latitude=${lat}&days=1`
        // console.log(lat,lng);

        const payload = {    
        };

        axios.get(url, payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log(response.data);
            console.log(response.data.dailyInfo[0].pollenTypeInfo[0].displayName)
            setPollen1(response.data.dailyInfo[0].pollenTypeInfo[0].displayName);
            setPollen2(response.data.dailyInfo[0].pollenTypeInfo[1].displayName);
            setPollen3(response.data.dailyInfo[0].pollenTypeInfo[2].displayName);

        })    
        .catch(error => {
            console.error(`Error: ${error.response.status}`);
            setPollen(null);
        })
    }    




    useEffect(() => {
        fetchWeather()

    },[place])

    useEffect( () => {
        console.log(values)
    },[values])

    return (
        <StateContext.Provider  value ={{
            weather,
            setPlace,
            values,
            thisLocation,
            airQuality, //exposing air quality data
            pollen1, // exposing pollen to frontend
            pollen2,
            pollen3
        }}>
            {children}
        </StateContext.Provider>
    )
}


export const useStateContext = () => useContext(StateContext)