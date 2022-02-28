import React,{useReducer, useState} from "react";
const initialErrorState = {}
const errorReducer = (state, action) =>{
  switch (action.type){
    case 'VALIDATIONERROR':
      return {
        message: action.payload.message,
        [action.payload.path] : true
      }
    case 'ERROR':
      const error = action.payload;
      error.path = 'options';
      error.message = action.payload.message
      return{
        error: error
      }
    case 'RESET_ERROR' :
      return initialErrorState
    default : return state
  }
}

const useForm = () => {
  const [ formValues , setFormValues ] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    c_password: '',
    cedula: '',
    tlf: "",
    estados:'',
    tlfCode:"",
    address: '',
  })
  const [ error, dispatchError ] = useReducer(errorReducer, {})

  console.log(error)
  const handleOnChange = (ev) => {
    setFormValues({
      ...formValues,
      [ev.target.name]: ev.target.value
    })
  }

  
  return {
    formValues,
    setFormValues,
    handleOnChange,
    error,
    dispatchError,

  }
}

export { useForm };