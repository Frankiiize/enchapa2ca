import { useEffect, useState } from "react"

const requestAuth = {
  API_URL : "https://www.universal-tutorial.com/api/getaccesstoken",
  HEADERS : {
    "Authorization" : "Bearer tyqXgwIgXUHFCynAYwP-xv__V8uCL-AMZEhaP5fG-WY4oWjaV1yfzE5KgOxKsblJZMs",
    "Accept": "application/json",
    "api-token": "tyqXgwIgXUHFCynAYwP-xv__V8uCL-AMZEhaP5fG-WY4oWjaV1yfzE5KgOxKsblJZMs" ,
    "user-email": "frankiiize@gmail.com"
  },
};
const API_URL= 'https://www.universal-tutorial.com/api/';
const useApiCountries = () => {
  const apiInitialState = {
    estado: '',
    ciudad: '',
    estadoData: null,
    ciudadesData: null
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
      /* navigate("/", { replace: true }); */
      console.log(error);
      setApiError(true)
    }
    return () => {
      setApiAuthToken(false)
    }
    
  },[])
  
  const getVzlaCities = async () => {
   /*  const mutateQuery = query.replace(' ', '%20') */
   const mutateQuery = 'cities/Distrito%20Federal'
    try{
      const data = await fetch(`${API_URL}${mutateQuery}`,{
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
      console.log(response)
    }catch(error){
      setApiError(true)
      console.log(error);
    }
    setApiLoading(false)
  }
  
  const getVzlaStates = async (query) => {
    if(currentEstado.estadoData === null){
      setApiLoading(true)
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
        setApiLoading(false)
      }catch(error){
        console.log(error);
        setApiError(true)
      }
    }
    else{
      return currentEstado
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