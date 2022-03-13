import React,{ useState } from "react";
const imgUploadInitialState = {
  result: null,
  file:null,
 }

const useImgUploader = () =>{
  const [ imgUpload, setImgUpload, imgUploadInitialState ] = useState(imgUploadInitialState);
  console.log(imgUpload)
  
  return {
    imgUpload,
    setImgUpload,
    imgUploadInitialState
  }
}

export { useImgUploader }; 