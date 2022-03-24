import React,{ useContext, useState} from "react";
//STYLES

//----STYLES
import { useParams } from "react-router-dom";
import { ProducDetailsCard } from "../components/ProducDetailsCard.jsx";
import { productsContext } from "../context/productsContext";
import { Main } from "../layouts/Main.jsx";
import { LoaderElipsis } from "../components/loaders/loaderElipsis.jsx";
import { SkeletonProductDetails } from "../components/loaders/SkeletonProductDetails.jsx";



const ProductDetails = () => {
  const { newProducts, productsLoading } = useContext(productsContext);
  const params = useParams();

  const detailProduct = newProducts.find(item => item.id === params.id);
  
  if(!detailProduct){
    const [ detailsPersintence, setDetailsPersintence ] = useState(JSON.parse(localStorage.getItem('detailsProduct')))
    return (
      <>

        {
          productsLoading 
          ? <SkeletonProductDetails />
          : <Main sectionClass={"main-userOn"}>
              <section className="productDetails">
                <ProducDetailsCard 
                  product={detailsPersintence}
                />
              </section>
            </Main>
        }
      </>
   
    )
  }
  return(
    <>
      { 
        productsLoading 
        ? <SkeletonProductDetails />
        : <Main sectionClass={"main-userOn"}>
            <section className="productDetails">
              <ProducDetailsCard 
                product={detailProduct}
              />
            </section>
          </Main>
      }
    </>
  
  );
}

export { ProductDetails };