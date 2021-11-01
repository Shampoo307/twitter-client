import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Alert } from 'react-bootstrap';

export default function ScoreTotal(props) {

    

    return (
        <div className="score-total-div">
            <Row>
                <h1>Analyses</h1>
            </Row>
            <Row>
                <Col>
                    <p>The overall sentiment analysis can range between -5 and +5; the lower the score the more negative, and the higher, the more positive.</p>
                </Col>
                <Col>
                    <Alert variant="primary" style={{ fontSize: '1.2rem' }}>Overall Sentiment Score from {props.numTweets} tweets: {props.total}</Alert>
                </Col>
            </Row>
        </div>
    )
}

