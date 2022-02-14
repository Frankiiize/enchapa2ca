import React from "react";
import { MdSearch } from 'react-icons/md'

const SearchInput = ({handleSearch}) =>{
  return(
    <form className="headerContainer__search">
      <label htmlFor="search" ></label>
      <input 
      type="text" 
      placeholder="buscar productos" 
      name="search" 
      onChange={handleSearch}
      />
      <span className="headerContainer__search-icon"> <MdSearch size={30} color={"#39c4a1"}/> </span>
    </form>
  )
}

export { SearchInput }; 