import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Search from "../components/Search";
import Results from "../components/Results";

export default function Form(props) {

    const [ searchValue, setSearchValue ] = useState('');
    const [ searchResults, setSearchResults ] = useState([]);
    const [ tweetSentiments, setTweetSentiments ] = useState([]);

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSearch = async (event) => {
        event.preventDefault();
        // Retrieve tweets based on search query
        const tweets = await fetch(`/search/${searchValue}`).then(res => res.json());
        setSearchResults(tweets.data);

        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tweets.data)
        }
        // perform sentiment analysis on tweets
        const tweetSentimentResult = await fetch('/nlp/s-analysis', options).then(res => res.json());
        setTweetSentiments(tweetSentimentResult);
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

