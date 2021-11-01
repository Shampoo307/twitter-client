import React, { useEffect, useState } from "react";
import { Container, Row, Col, ListGroup, Card } from "react-bootstrap";
import ScoreTotal from "./ScoreTotal";
// import Chart from 'chart.js/auto';

export default function Analyses (props) {
	const { tweets } = props;
	const aggregate = tweets.reduce((acc, next) => acc = next.sentiment, 0);
	
	return (
		<div>
			<ScoreTotal total={aggregate}/>
		</div>
	)
}
