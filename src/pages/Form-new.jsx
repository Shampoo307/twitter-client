import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Search from "../components/Search";
import Results from "../components/Results";
import Analyses from "../components/Analyses";

import useWebSocket from '../components/webSocketHook';

export default function FormNew(props) {

    const [ searchBarValue, setSearchBarValue ] = useState('');
    const [ tweetsList, setTweetsList ] = useState([]);

    const handleSearchBarChange = (event) => {
        setSearchBarValue(event.target.value);
    };

    // Init websocket connection with server
    const ws = useWebSocket({
        socketUrl: 'ws://localhost:3000'
    });

    // Update tweets list every time web socket receives
    // new data from server
    useEffect(() => {
        if (ws.data) {
            const { data } = ws.data;
            if (data) {
                setTweetsList((tweetsList) => 
                    [].concat(data, tweetsList)
                );
            }
        }
    }, [ws.data]);

    // On Button click send search query to server
    const sendData = (event) => {
        // Stop page reload on 'Search'........
        event.preventDefault();
        setTweetsList([]);
        // Send search query
        ws.send(searchBarValue)
    };

    return (
        <Container className="form-container" fluid="sm">
        <Row>
            <Col className="tweet-search">
                <Row>
                    <Search 
                        handleSearch={sendData}
                        label="Search for a hashtag..."
                        value={searchBarValue}
                        placeholder="Search for a hashtag..."
                        onChange={handleSearchBarChange}
                        submitText="Search"
                    />
                </Row>
                <Row>
                    { tweetsList && <Results results={tweetsList} /> }
                </Row>
            </Col>
            <Col xs lg="9" className="analyses-column">
                <Analyses tweets={tweetsList} />
            </Col>
        </Row>
    </Container>
    )
}