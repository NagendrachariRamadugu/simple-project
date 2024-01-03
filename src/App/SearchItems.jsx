import './SearchItems.css';
import { useState } from 'react';

const SearchItems = ({search, setSearch}) => {
    return (
        <form 
            className="search"
        >
            <input 
                type="text"
                placeholder='Search Items'
                value = {search}
                className = 'search-input'
                onChange={(e) => {
                    setSearch(e.target.value);
                }}                         
            />
        </form>
    )
}

export default SearchItems;