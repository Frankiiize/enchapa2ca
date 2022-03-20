import React,{ useState } from "react";
const imgUploadInitialState = {
  result: null,
  file:null,
 }

const useImgUploader = () =>{
  const [ imgUpload, setImgUpload, imgUploadInitialState ] = useState(imgUploadInitialState);
  
  return {
    imgUpload,
    setImgUpload,
    imgUploadInitialState
  }
}

export { useImgUploader }; 