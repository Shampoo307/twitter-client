import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Search from "../components/Search";
import Results from "../components/Results";

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
        <Container className="form-container">
            <Row>
                <Col>
                    <Search 
                        handleSearch={handleSearch}
                        label="Search for a hashtag..."
                        value={searchValue}
                        placeholder="Search for a hashtag..."
                        onChange={handleSearchChange}
                        submitText="Search"
                    />
                </Col>
                <Col xs={8}>
                    <Results />
                </Col>
            </Row>
        </Container>
    )
}

