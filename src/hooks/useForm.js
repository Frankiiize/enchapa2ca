import React,{useState} from "react";

const useForm = () => {
  const [ formValues , setFormValues ] = useState({
    name: '',
    lasName: '',
    email: '',
    password: '',
    c_password: '',
    cedula: '',
    tlf: "",
    address: '',
  })
  const handleOnChange = (ev) => {
    setFormValues({
      ...formValues,
      [ev.target.name]: ev.target.value
    })
    console.log(formValues)
  }

  
  return {
    formValues,
    setFormValues,
    handleOnChange,

  }
}

export { useForm };