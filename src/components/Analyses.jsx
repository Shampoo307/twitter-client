import React, { Component } from "react";
import { Container, Row, Col, ListGroup, Card } from "react-bootstrap";
import Chart from 'chart.js/auto';

export default class LineChart extends Component {

	chartRef = React.createRef();

	componentDidMount() {
		const ctx = this.chartRef.current.getContext("2d");
		
		new Chart(ctx, {
			type: "line",
			data: {
				labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
				datasets: [{ 
					data: [86,114,106,106,107,111,133],
					label: "Total",
					borderColor: "#3e95cd",
					backgroundColor: "#7bb6dd",
					fill: false,
				}
				]
			},
		});
	}
	render() {
		return (
			<div>
				<canvas
				id="myChart"
				ref={this.chartRef}
				/>
			</div>
			)
	}
}