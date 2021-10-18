import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Search from "../components/Search";
import Results from "../components/Results";

export default function Form(props) {

    const [ searchValue, setSearchValue ] = useState('');
    const [ searchResults, setSearchResults ] = useState([]);

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSearch = (event) => {
        event.preventDefault();
        // MAKE SEARCH (call server endpoint)
        fetch(`/search/${searchValue}`)
            .then(res => res.json())
            .then(res => {
                setSearchResults(res.data);
            });
    };




    return (
        <Container className="form-container" fluid="lg">
            <Row>
                <Col className="tweet-search">
                    <Row>
                        <Search 
                            handleSearch={handleSearch}
                            label="Search for a hashtag..."
                            value={searchValue}
                            placeholder="Search for a hashtag..."
                            onChange={handleSearchChange}
                            submitText="Search"
                            />
                    </Row>
                    <Row>
                        { searchResults && <Results results={searchResults} /> }
                    </Row>
                </Col>
                <Col xs lg="8">
                </Col>
            </Row>
        </Container>
    )
}

