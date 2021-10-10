import React, { useState } from "react";
import Search from "../components/Search";

export default function Form(props) {

    const [ searchValue, setSearchValue ] = useState('');

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSearch = (event) => {
        event.preventDefault();
        // MAKE SEARCH (call server endpoint)
    };




    return (
        <div>
            <p>FORM</p>
            <Search 
                handleSearch={handleSearch}
                label="Search for a hashtag..."
                value={searchValue}
                placeholder="Search for a hashtag..."
                onChange={handleSearchChange}
                submitText="Search"
            />
        </div>
    )
}

