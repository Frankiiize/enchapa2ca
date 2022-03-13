import React, { useState } from "react";
import '../styles/components/fileUploader.css'
import { MdUploadFile } from 'react-icons/md'
import { BsFileEarmarkCheckFill } from 'react-icons/bs'
const FileUploader = ({setImgUpload, imgUpload, errorForm, dispatchError, title = 'comprobante de pago', addminPage = false}) => {
  
  const [ loading , setLoading ] = useState(true);
  const handleUploadPhoto = (e) => {
    if(errorForm.options){
      dispatchError({type: 'RESET_ERROR'})
    }
    const photo = e.target.files[0]
    console.log(photo)
    
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      console.log(event.target.result);
      
      setImgUpload({
        ...imgUpload,
        result: event.target.result,
        file: photo,
      
      })
      setLoading(false)

    });
    reader.readAsDataURL(photo);
  }
  return(
    <>
      <h3>{title}</h3>
      <label className="fileLoaderContainer"  htmlFor="photoPaid">
        {
          !!loading 
            ? <MdUploadFile 
                style={{fill:'var(--black-color)'}} 
                size={32}
                color={"white"} 
              />
            : <BsFileEarmarkCheckFill 
                className="fade-in"
                style={{fill:'var(--sucess-color)'}} 
                size={27}
                color={"white"} 
              />

        }
        
        <input
        multiple
          className={
            !addminPage
            ? !!errorForm.options ? 'file-select-error' : loading ? 'file-select' : 'file-select-load fade-in' 
            : !!errorForm.options ? 'file-selec-admin-error' : loading ? 'file-selec-admin' : 'file-selec-admin-load fade-in' 
          }
          id="photoPaid"
          name="photoPaid"
          type="file"
          onChange={handleUploadPhoto}
          onClick={() => setLoading(true)}
          required
        />
        
      </label>
    </>
  )
}
export { FileUploader };