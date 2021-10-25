import React from "react";
import { Container, Row, Col, ListGroup, Card } from "react-bootstrap";
import { Line } from 'react-chartjs-2';


export default function Analyses(props) {
    const analysedTweets = props.analysis.map((tweet) => {

        const state = {
            labels: tweet.id,
            datasets: [
                {
                    label: 'Sentiment1',
                    fill: false,
                    lineTension: 0.5,
                    backgroundColor: 'rgba(75,192,192,1)',
                    borderColor: 'rgba(0,0,0,1)',
                    borderWidth: 2,
                    data: tweet.sentiment
                }
            ]
        }
        // console.log("THIS  ----> " + tweet.data);
        console.log("ID: " + tweet.id);
        console.log("Sentiment:  " + tweet.sentiment);
       
        return (
            <div>
                <Line
                    data={state}
                    options={{
                        title: {
                            display: true,
                            text: 'Sentiment',
                            fontSize: 20
                        },
                        legend: {
                            display: true,
                            position: 'right'
                        }
                    }}
                                   
                />
            </div>
        )
    })
    return (
        <Container className="analysis-results">
            { analysedTweets }
        </Container>
    )
}

