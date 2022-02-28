import React,{ useEffect, useState} from "react";


const CheckRadios = ({ children, refOption, deliveryOption, setDeliveryOption, valuesPayMethod, user, serverTimestamp }) => {


  return (
    <>
      <li>
        <input 
          ref={refOption}
          onChange={() => setDeliveryOption({
            personal:true,
            delivery:{
              state: false,
            },
            pay: {
              wireTrans: false,
              mobilPay: false
            }
          })}
          checked={deliveryOption.personal}
          type="radio" 
          id="entregaPersonal"
        />
        <label htmlFor="entregaPersonal">entrega personal</label>
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
          onChange={() => setDeliveryOption({
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
          })} 
          checked={deliveryOption.delivery.state}
          type="radio" 
          id="delivery"/>
        <label htmlFor="delivery">envio</label>
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
              onChange={() => setDeliveryOption({
                personal:false,
                delivery:{
                  state:true,
                  mrw:true,
                  zoom:false,
                },
                pay: {...deliveryOption.pay}
              })} 
              checked={deliveryOption.delivery.mrw}
              type="radio" 
              id="mrw"/>
            <label htmlFor="mrw">MRW</label>
          </li>
          <li>
            <input 
              ref={refOption}
              onChange={() => setDeliveryOption({
                personal:false,
                delivery:{
                  state:true,
                  mrw:false,
                  zoom:true,
                },
                pay: {...deliveryOption.pay}
              })} 
              checked={deliveryOption.delivery.zoom}
              type="radio" 
              id="zoom"/>
            <label htmlFor="zoom">ZOOM</label>
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
              onChange={() => setDeliveryOption({
                personal:false,
                delivery:{...deliveryOption.delivery},
                pay: {
                  wireTrans: true,
                  mobilPay: false
                }
              })}
              checked={deliveryOption.pay.wireTrans}
              />
              <label htmlFor="transferWire">transferencia bancaria</label>
            </li>
            <li>
              <input
              ref={refOption} 
              type="radio" 
              id="mobilpay"
              onChange={() => setDeliveryOption({
                personal:false,
                delivery:{...deliveryOption.delivery},
                pay: {
                  wireTrans: false,
                  mobilPay: true
                }
              })}
              checked={deliveryOption.pay.mobilPay} 
              />
              <label htmlFor="mobilpay">pago mobil</label>
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