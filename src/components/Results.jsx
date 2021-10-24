import React from "react";
import { Container, Row, Col, ListGroup, Card } from "react-bootstrap";



export default function Results(props) {
    const items = props.results.map((item, index) => {
        return (
            // TODO

            // Make separate 'SearchResult' component
            // and feed in data 


            // <ListGroup.Item>
                
            //     {item.text}
            // </ListGroup.Item>
            <Card
                bg="Light"
                text="dark"
                style={{ width: '30rem' }}
                key={index}
                className="mb-2 tweet-card"
            >
                <Card.Body>
                    <Card.Header>{item.id}</Card.Header>
                    <Card.Text>{item.text}</Card.Text>
                </Card.Body>
            </Card>
        )
    })
    return (
        <Container className="search-results">
            { items }
        </Container>
    )
}