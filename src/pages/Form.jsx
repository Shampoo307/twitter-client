import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Search from "../components/Search";
import Results from "../components/Results";
import Analyses from "../components/Analyses";

import useWebSocket from '../components/webSocketHook';


export default function Form(props) {

    const [ searchValue, setSearchValue ] = useState('');
    const [ searchResults, setSearchResults ] = useState([]);
    const [ tweetSentiments, setTweetSentiments ] = useState([]);
    const [ totalSentiment, setTotalSentiment ] = useState(0);

    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    const analyseTweets = async (tweets) => {
        // tweets.forEach(async tweet => {
            const options = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(tweets)
            }
            // const tweetSentimentResult = await fetch('/nlp/s-analysis', options).then(res => res.json()).then;
            const result = await fetch('/nlp/s-analysis', options)
                .then(res => res.json())
                // .then(res => {
                //     const bar = tweetSentiments;
                //     bar.push(res.sentiment);
                //     setTweetSentiments(bar);
                //     console.log('total', totalSentiment);
                //     const current = total;
                //     const newNum = current + Number(res.sentiment);
                //     console.log('current', current);
                //     console.log('new ', newNum);
                    
                //     // const  = Number(res.sentiment) !== null ? Number(res.sentiment) : 0);
                //     console.log('THE NUMBER ', Number(res.sentiment));
                //     console.log('result ', res);
                //     console.log('tweetsentimentreuslt', bar);
                // });
            setTweetSentiments(() => result.map(x => x.sentiment));
            setTotalSentiment(() => result.reduce((acc, next) => acc + next.sentiment, 0));
        // });
    }

    const handleSearch = async (event) => {
        event.preventDefault();
        // Retrieve tweets based on search query
        const tweets = await fetch(`/search/${searchValue}`).then(res => res.json());
        setSearchResults(tweets.data);

        
        console.log('aegae', tweets.data);
        // perform sentiment analysis on tweets
        analyseTweets(tweets.data);
        // const tweetSentimentResult = await fetch('/nlp/s-analysis', options).then(res => res.json());
        // setTweetSentiments(tweetSentimentResult);
    };

    const getTotal = () => tweetSentiments.reduce((acc, next) => acc + next, 0);

    const WebSock = () => {

        const sendTag = (message) => <span>&#11014;: {message}</span>;
        const receiveTag = (message) => <span>&#11015;: {message}</span>;

        const [ messagesList, setMessagesList ] = useState([<span>Messages will be displayed here</span>]);
        
        const txtRef = useRef();

        const ws = useWebSocket({
            socketUrl: 'ws://localhost:3000'
        });
        // receive messages
        useEffect(() => {
            if (ws.data) {
            const { message } = ws.data;
            setMessagesList((messagesList) =>
                [].concat(receiveTag(message), messagesList)
            );
            }
        }, [ws.data]);
        
        // send messages
        const sendData = () => {
            const message = txtRef.current.value || '';
            if (message) {
            setMessagesList((messagesList) =>
                [].concat(sendTag(message), messagesList)
            );
            ws.send(message);
            }
        };

        return (
            <div>
               <div>Connection State: {ws.readyState ? 'Open' : 'Closed'}</div>
        
              <div>      
               <form>
                  <label>Message (string or json)</label>
                  <textarea name='message' rows={4} ref={txtRef} />
                  <input type='button' onClick={sendData} value='Send' />
                </form>
              </div>
        
              <div style={{ maxHeight: 300, overflowY: 'scroll' }}>
                {messagesList.map((Tag, i) => (
                  <div key={i}>{Tag}</div>
                ))}
              </div>
        
            </div>
          );
    }

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
                    <Analyses sentiment={totalSentiment} />
                    <WebSock />
                </Col>
            </Row>
        </Container>
    )
}

