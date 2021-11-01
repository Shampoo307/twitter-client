import React, { useEffect, useState } from "react";
import { Container, Row, Col, ListGroup, Card } from "react-bootstrap";
import ScoreTotal from "./ScoreTotal";
// import Chart from 'chart.js/auto';

export default function Analyses (props) {
	const [ aggregate, setAggregate ] = useState(0);

	useEffect(() => {
		const tweets = props.tweets;
		setAggregate(tweets.reduce((acc, next) => acc + next.sentiment, 0));
	}, [props.tweets])
	
	return (
		<div>
			<ScoreTotal total={aggregate}/>
		</div>
	)
}
