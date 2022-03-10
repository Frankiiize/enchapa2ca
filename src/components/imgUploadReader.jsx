import React from "react";

const ImgUploadReader = ({imgUpload}) => {
  return (
    <picture>
        <img src={imgUpload.result} alt='foto comprobante de pago' />
    </picture>
  )
}

export { ImgUploadReader };