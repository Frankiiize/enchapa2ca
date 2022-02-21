import React, { useContext, useState } from "react";
import { authContext } from "../context/AuthContext.js";

import { Categories } from "../components/Categories.jsx";
import { SectionProducts } from "../layouts/SectionProducts.jsx";
import { Footer } from "../components/Footer.jsx";
import { Hero } from "../components/Hero.jsx";


import imgFAKE from '../assets/images/imagenFAKE.jpg';
import productFAKE from '../assets/images/produtcFAKE.jpg';

import '../styles/pages/home.css'
import { ProductsList } from "../components/ProductsList.jsx";

const categorias = [
  {
    name: 'tazas',
    img: imgFAKE,
    id: 1,
  },
  {
    name: 'etiquetas',
    img: imgFAKE,
    id: 2
  },
  {
    name: 'delantales',
    img: imgFAKE,
    id: 3
  },
  {
    name: 'mascarillas',
    img: imgFAKE,
    id: 4
  },
  {
    name: 'mousepad',
    img: imgFAKE,
    id: 5
  },
  {
    name: 'portacarnet',
    img: imgFAKE,
    id: 6
  },
  {
    name: 'cartucheras',
    img: imgFAKE,
    id: 7
  },
  {
    name: 'popsockets',
    img: imgFAKE,
    id: 8
  },
  {
    name: 'chapas',
    img: imgFAKE,
    id: 9
  },
  {
    name: 'ropa',
    img: imgFAKE,
    id: 10
  },
]
const nuevosProductos = [
  {
    img: productFAKE,
    id:1,
    name: 'taza',
    price: 20,
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
  },
  {
    img: productFAKE,
    name: 'etiqueta',
    id:2,
    price: 3,
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's"
  },
  {
    img: productFAKE,
    name: 'delantal',
    id:3,
    price: 25,
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
  },
  {
    img: productFAKE,
    name: 'chapa',
    id:4,
    price: 7,
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
  },
  {
    img: productFAKE,
    name: 'padmouse',
    id:5,
    price: 10,
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's "
  },
  {
    img: productFAKE,
    name: 'blusa',
    id:6,
    price: 15,
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
  },
]

const Home  = () => {
  const [ categories, setCategories ] = useState(categorias);
  const [ newProducts, setNewProducts ] = useState(nuevosProductos)
  return(
    <main>
     {/* <Hero /> */}

      <Categories categories={categories} />
      

      <SectionProducts  sectionClass={"Products"} button={false}>
        <ProductsList sectionClass={"Products__grid"} products={newProducts} />
      </SectionProducts>
      
      <SectionProducts title={'nuevos productos'} sectionClass={'Products'} button={true}>
        <ProductsList sectionClass={"Products__list"}  products={newProducts}  />
      </SectionProducts>

      <SectionProducts  title={'nuevos productos'} sectionClass={'Products'} button={true}>
        <ProductsList sectionClass={"Products__list"} products={newProducts} />
      </SectionProducts>
    
      <Footer/>
    </main>
  )
};

export { Home };