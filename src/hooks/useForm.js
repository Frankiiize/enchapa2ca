import React,{useReducer, useState} from "react";
import * as yup from 'yup'
const initialErrorState = {}
const errorReducer = (state, action) =>{
  switch (action.type){
    case 'VALIDATIONERROR':
      return {
        message: action.payload.message,
        [action.payload.path] : true
      }
    case 'ERROR':
      return{
        message : action.payload.message,
        options: true
      }
    case 'RESET_ERROR' :
      return initialErrorState
    case 'TYPEERROR' : 
      return {
        options: true
      }
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
    phone: "",
    phoneCode:"",
    estados:'',
    cities:'',
    address: '',
  })
  
  const [ error, dispatchError ] = useReducer(errorReducer, {})
  
  let schemaPersonal = yup.object().shape({
    name: yup.string().matches(/\w{2,}/g,{message: 'ingresa tu nombre'}).required('nombre requerido'),
    lastName: yup.string().matches(/\w{2,}/g,{message: 'ingresa tu apellido'}).required('apellido requerido'),
    phone: yup.string().matches(/^(0414|0424|0412|0416|0426)[0-9]{7}$/gm, {message: "Ingrese un número válido."}).required('telefono requerido'),
    email: yup.string().email('ingresa un email valido').required('email requerido'),
    cedula: yup.string().matches(/[0-9]{5,8}/,{message: 'ingresa un numero de cedula valido'}).required('cedula requerida'),
    envio: yup.string().matches(/^(entrega-personal|delivery)$/g,{message:'selecciona un metodo de envio'}).required('selecciona un metodo de envio'),
  })
  let schemaDelivery = yup.object().shape({
    name: yup.string().matches(/\w{2,}/g,{message: 'ingresa tu nombre'}).required('nombre requerido'),
    lastName: yup.string().matches(/\w{2,}/g,{message: 'ingresa tu apellido'}).required('apellido requerido'),
    phone: yup.string().matches(/^(0414|0424|0412|0416|0426)[0-9]{7}$/gm, {message: "Ingrese un número válido."}).required('telefono requerido'),
    email: yup.string().email('ingresa un email valido').required('email requerido'),
    cedula: yup.string().matches(/[0-9]{6,8}/,{message: 'ingresa un numero de cedula valido'}).required('cedula requerida'),
    envio: yup.string().matches(/^(entrega-personal|delivery)$/g,{message:'selecciona un metodo de envio'}).required('selecciona un metodo de envio'),
    countryState: yup.string().required('selecciona tu estado').nullable(),
    address: yup.string().matches(/\w{2,}/g,{message: 'ingresa tu direccion'}).required('direccion requerida'),
    shipping: yup.string().matches(/^(mrw|zoom)$/g,{message:'selecciona un currier'}).required('selecciona un currier'),
    paidMethod: yup.string().matches(/^(pago-mobil|transferencia-bancaria)$/g,{message: 'selecciona un metodo de pago'}).required('metodo de pago requerido'),
    userUID: yup.string(),
    totalPrice: yup.number().integer().required('sin articulos')
  })

  const handleOnChange = (ev) => {
    setFormValues({
      ...formValues,
      [ev.target.name]: ev.target.value
    })
    if(Object.keys(error).includes(ev.target.name)){
      dispatchError({type:'RESET_ERROR'})
    }
  }

  
  return {
    formValues,
    setFormValues,
    handleOnChange,
    error,
    dispatchError,
    schemaPersonal,
    schemaDelivery

  }
}

export { useForm };