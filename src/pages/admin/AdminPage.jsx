import React, { useEffect,useState, useContext, useRef } from 'react'
import { useGetOrders } from '../../hooks/useGetOrders';
import { OrdersList } from '../../components/OrdersList.jsx'
import { authContext } from '../../context/AuthContext';
import { SearchInput } from '../../components/SearchInput.jsx';
import { adminContext } from '../../context/adminContext';
import { FileUploader } from '../../components/FileUploader.jsx';
import { useForm } from '../../hooks/useForm';
import { buyContext } from '../../context/buyContext';
import { useImgUploader } from '../../hooks/useImgUploader';
import { ImgUploadReader } from '../../components/imgUploadReader.jsx';
import '../../styles/pages/admin/admin.css'
import { ProductsForm } from '../../components/Forms.jsx';
import { LoaderElipsis } from '../../components/loaders/loaderElipsis.jsx';
const Adminpage = () =>{
  const { userState } = useContext(authContext)
  const { ordersHistory, getAllOrders, dispathOrdersHistory, updateStatus, loadingUpdate, deleteOrder, handleOrdersSearch, filterOrders, searchOn, searchError } = useGetOrders();
  const { 
    showOrders, 
    setShowOrders , 
    handleOrderStatus, 
    orderStatus, 
    showAddProducts, 
    setShowAddProducts, 
    imgUpload,
    setImgUpload,
    writeNewProduct,
    formValuesInitialState,
    formValues,
    setFormValues,
    onChangeProductsForm,
    formLoading
  } = useContext(adminContext)
  const {  error, dispatchError } = useForm();
  
  const form = useRef();
  useEffect(() => {
    getAllOrders();
  },[])



  const changeStatus = (docRef) => {
    updateStatus(docRef, orderStatus.status);
  }
  
  const submitNewProducts = async (ev) => {
    ev.preventDefault();
    const  formData = new FormData(form.current);
    //validar DATOS!
    const data = {
      name : formData.get('producName'), 
      price: parseInt(formData.get('producPrice')),
      description: formData.get('description'),
      stockAvalible: parseInt(formData.get('stockAvalible')),
      itemsQuantity: parseInt(formData.get('itemsQuantity')),
      custom: formValues.custom,
      categoryId: parseInt(formValues.categoryId)
    }
    debugger
    console.log(data)
    try{
      if(!!imgUpload){
        await writeNewProduct(data);
      }
      else{
        throw new Error('SUBE_COMPROBANTE')
      }

    }catch(error){
      dispatchError({type: 'ERROR', payload:'sube una foto'})
      console.log(error)
    }
   
  }

 
  return (
    <main className='admin footer__user-on'>
      <h1>ADMIN PAGE</h1>
      <button onClick={() => setShowOrders(!showOrders)}>
        <h3>ordenes</h3>
      </button>
      <SearchInput 
        handleSearch={handleOrdersSearch}
        placeholder={'busca por OrderId, Cedula o Fecha(dia,mes,año)'}
      />
      {
        showOrders && (
          <section className="orders">
            <>
              {
                !searchOn 
                  ?<ul className="orderHistoryContainer">
                    {ordersHistory.map((order) => (
                      <OrdersList
                        order={order}
                        key={order.orderId}
                        buttoms={"admin"}
                        dispathOrdersHistory={dispathOrdersHistory}
                        handleOrderStatus={handleOrderStatus}
                        changeStatus={changeStatus}
                        userState={userState}
                        statusOption={orderStatus}
                        loadingUpdate={loadingUpdate}
                        deleteOrder={deleteOrder}
                      />
                    ))}
                  </ul>
                  : <ul className="orderHistoryContainer">
                    {filterOrders.map((order) => (
                      <OrdersList
                        order={order}
                        key={order.orderId}
                        buttoms={"admin"}
                        dispathOrdersHistory={dispathOrdersHistory}
                        handleOrderStatus={handleOrderStatus}
                        changeStatus={changeStatus}
                        userState={userState}
                        statusOption={orderStatus}
                        loadingUpdate={loadingUpdate}
                        deleteOrder={deleteOrder}
                      />
                    ))}
                  </ul>
              }
            </>
          </section>
        )
      }
    
      
      <button onClick={() => setShowAddProducts(!showAddProducts)}>
        <h3>productos</h3>
      </button>
          {showAddProducts && (
            <section className="products">
                  <>
                  {
                    !formLoading
                    ? <ProductsForm  
                        form={form}
                        submitNewProducts={submitNewProducts}
                        animation={'fade-in'}
                        formValues={formValues}
                        setFormValues={setFormValues}
                        onChangeProductsForm={onChangeProductsForm}
                        >
                        <FileUploader 
                          setImgUpload={setImgUpload}
                          imgUpload={imgUpload}
                          errorForm={error}
                          dispatchError={dispatchError}
                          title={'foto'}
                          btnTitle={'foto'}
                          addminPage={true}
                        />
                      {
                        !!imgUpload &&
                        <ImgUploadReader 
                          imgUpload={imgUpload}
                        />
                      }
                    </ProductsForm> 
                    : <LoaderElipsis />
                  }
                    
                  </>
            </section>
          )}
    </main>
  );
}

export { Adminpage };