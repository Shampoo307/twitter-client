import React from "react";
import { Form, Button, Row, Col } from 'react-bootstrap';

export default function Search(props) {
    return (
        <Form onSubmit={props.handleSearch} className="search-bar">
            <Form.Group>
                <Form.Label>{props.label}</Form.Label>
                <Row>
                    <Col>
                        <Form.Control
                            type="search"
                            name="searchTerm"
                            value={props.value}
                            placeholder={props.placeholder}
                            onChange={props.onChange}
                            autoComplete="off"
                        />
                    </Col>
                    <Col xs="auto">
                        <Button variant="info" type="submit">
                            {props.submitText}
                        </Button>
                    </Col>
                </Row>
            </Form.Group>
        </Form>
    )
}

