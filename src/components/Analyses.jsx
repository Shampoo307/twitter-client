import React, { useEffect, useState } from "react";
import { Container, Row, Col, ListGroup, Card } from "react-bootstrap";
import ScoreTotal from "./ScoreTotal";
// import Chart from 'chart.js/auto';

export default function Analyses (props) {

	return (
		<div>
			<ScoreTotal total={props.sentiment}/>
		</div>
	)
}
