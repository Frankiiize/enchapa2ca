import { ActionCodeOperation } from "firebase/auth";
import React,{ useEffect, useState} from "react";
import '../styles/components/checkRadios.css'

const CheckRadios = ({ children, refOption, deliveryOption, setDeliveryOption, error, dispatchError  } ) => {


  return (
    <>
      <li>
        <input 
          ref={refOption}
          onChange={() => {
            setDeliveryOption({
              personal:true,
              delivery:{
                state: false,
              },
              pay: {
                wireTrans: false,
                mobilPay: false
              }
            })
            dispatchError({type:'RESET_ERROR'})
          }}
          checked={deliveryOption.personal}
          type="radio" 
          id="entregaPersonal"
        />
        <label
          className={!!error.options ? 'border-error' : 'undefined'}
          htmlFor="entregaPersonal"

          >
            entrega personal
        </label>
      </li>
      {
        deliveryOption.personal &&
        <li
          className={ deliveryOption.personal && 'fade-in'}
        >
          <p>solo valencia</p>
        </li>
      }
      <li>
        <input 
          ref={refOption}
          onChange={() => {
            setDeliveryOption({
              personal:false,
              delivery:{
                state:true,
                mrw:false,
                zoom:false,
              },
              pay: {
                wireTrans: false,
                mobilPay: false
              }
            })
            dispatchError({type:'RESET_ERROR'})
          }} 
          checked={deliveryOption.delivery.state}
          type="radio" 
          id="delivery"/>
        <label 
          htmlFor="delivery"
          className={!!error.options ? 'border-error' : 'undefined'}
          >
            envio
          </label>
      </li>
      {
        deliveryOption.delivery.state && 
        <ul className={deliveryOption.delivery.state ?'fade-in' : 'checkoutMain__resume-DeliveryOptions'}>
          <li>
            <h3> selecciona un currier</h3>
          </li>
          <li>
            <input 
              ref={refOption}
              onChange={() => {
                setDeliveryOption({
                  personal:false,
                  delivery:{
                    state:true,
                    mrw:true,
                    zoom:false,
                  },
                  pay: {...deliveryOption.pay}
                })
                dispatchError({type:'RESET_ERROR'})
              }} 
              checked={deliveryOption.delivery.mrw}
              type="radio" 
              id="mrw"/>
            <label 
              htmlFor="mrw"
              className={!!error.shipping ? 'border-error' : 'undefined'}
              >
                MRW
            </label>
          </li>
          <li>
            <input 
              ref={refOption}
              onChange={() => {
                setDeliveryOption({
                  personal:false,
                  delivery:{
                    state:true,
                    mrw:false,
                    zoom:true,
                  },
                  pay: {...deliveryOption.pay}
                })
                dispatchError({type:'RESET_ERROR'})
              }} 
              checked={deliveryOption.delivery.zoom}
              type="radio" 
              id="zoom"/>
            <label 
              htmlFor="zoom"
              className={!!error.shipping ? 'border-error' : 'undefined'}
              >
                ZOOM
            </label>
          </li>
        </ul>
      }
      {
        deliveryOption.delivery.state  &&
          <ul className={deliveryOption.delivery.state ?'fade-in' : 'checkoutMain__resume-DeliveryOptions'}>
            <li>
              <h3>Selecciona un Metodo de pago</h3>
            </li>
            <li>
              <input
              ref={refOption} 
              type="radio" 
              id="transferWire"
              onChange={() => {
                setDeliveryOption({
                  personal:false,
                  delivery:{...deliveryOption.delivery},
                  pay: {
                    wireTrans: true,
                    mobilPay: false
                  }
                })
                dispatchError({type:'RESET_ERROR'})
              }}
              checked={deliveryOption.pay.wireTrans}
              />
              <label 
                htmlFor="transferWire"
                className={!!error.paidMethod ? 'border-error' : 'undefined'}
                >
                  transferencia bancaria
              </label>
            </li>
            <li>
              <input
              ref={refOption} 
              type="radio" 
              id="mobilpay"
              onChange={() => {
                setDeliveryOption({
                  personal:false,
                  delivery:{...deliveryOption.delivery},
                  pay: {
                    wireTrans: false,
                    mobilPay: true
                  }
                })
                dispatchError({type:'RESET_ERROR'})
              }}
              checked={deliveryOption.pay.mobilPay} 
              />
              <label 
                htmlFor="mobilpay"
                className={!!error.paidMethod ? 'border-error' : 'undefined'}
                >
                  pago mobil
                </label>
            </li>
          </ul>
      }
    
      <ul>
        {children}
      </ul>
  
            
    </>
  )
}

export { CheckRadios } ;