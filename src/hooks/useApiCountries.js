import { useEffect, useState } from "react"

const requestAuth = {
  API_URL : process.env.API_COUNTRY_UNIVERSAL_TUTORIAL,
  HEADERS : {
    "Authorization" : `Bearer ${process.env.UNIVERSAL_TUTORIAL_TOKEN}`,
    "Accept": "application/json",
    "api-token": process.env.UNIVERSAL_TUTORIAL_TOKEN,
    "user-email": process.env.UNIVERSAL_TUTORIAL_EMAIL
  },
};
const API_URL= 'https://www.universal-tutorial.com/api/';
debugger
const useApiCountries = () => {
  const apiInitialState = {
    estado: 'Carabobo',
    ciudad: 'Valencia',
    estadoData: [],
    ciudadesData: []
  }
  const [ apiAuthToken, setApiAuthToken ] = useState('');
  const [ currentEstado, setCurrentEstado ] = useState(apiInitialState);
  const [ apiLoading, setApiLoading ] = useState(true);
  const [ apiError, setApiError ] = useState(false);
 
  useEffect(()=> {
    try{
      const getAuthToken = async () => {
        const data = await fetch(requestAuth.API_URL, {
          method: 'GET',
          headers: requestAuth.HEADERS,
        });
        const authToken = await data.json();
        setApiAuthToken(authToken.auth_token);
        setApiLoading(false)
      }
      getAuthToken();
    }catch(error){
      navigate("/", { replace: true });
      console.log(error);
      setApiError(true)
    }

  },[])

  const getVzlaCities = async (query) => {
    try{
      const data = await fetch(`${API_URL}${query}`,{
        method: 'GET',
        headers: {
          Authorization: `Bearer ${apiAuthToken}`,
          Accept: "application/json"
        }
      });
      const response = await data.json();
      setCurrentEstado({
        ...currentEstado,
        ciudadesData: response
      });
    }catch(error){
      setApiError(true)
      console.log(error);
    }
    setApiLoading(false)
  }

  
  const getVzlaStates = async (query) => {
    try{
      const data = await fetch(`${API_URL}${query}`,{
        method: 'GET',
        headers: {
          Authorization: `Bearer ${apiAuthToken}`,
          Accept: "application/json"
        }
      });
      const response = await data.json();
      setCurrentEstado({
        ...currentEstado,
        estadoData: response
      });
    }catch(error){
      console.log(error);
      setApiError(true)
    }
  }

  
 return{
  currentEstado,
  getVzlaCities,
  getVzlaStates,
  setCurrentEstado,
  apiLoading,
  apiError
 }

}
export { useApiCountries } ;