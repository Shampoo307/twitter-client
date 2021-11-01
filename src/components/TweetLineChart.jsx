import React, { useEffect, useState } from "react";
import { Container, Row, Col, ListGroup, Card } from "react-bootstrap";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import Chart from 'chart.js/auto';

export default function TweetLineChart (props) {

    const CustomTooltip = ({ active, payload, label }) => {
		if (active && payload && payload.length) {
			return (
				<Card
					bg="Light"
					text="dark"
					style={{ width: '20rem', fontSize: '0.8rem' }}
					className="custom-tooltip tweet-card-chart"
				>
					<Card.Title>{`Sentiment Score : ${payload[0].value}`}</Card.Title>
					<Card.Subtitle>{`Date Created: ${payload[0].payload.created_at}`}</Card.Subtitle>
					<Card.Text>{`${payload[0].payload.text}`}</Card.Text>
				</Card>
			);
		}
		
		return null;
    };

	return (
		<ResponsiveContainer width="100%" height="100%" aspect={3}>
		<LineChart
			width={500}
			height={300}
			data={props.tweets}
			margin={{
			top: 5,
			right: 30,
			left: 20,
			bottom: 5,
			}}
		>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="created_at" />
			<YAxis />
			<Tooltip content={<CustomTooltip />}/>
			<Legend />
			<Line type="monotone" dataKey="sentiment" stroke="#8884d8" activeDot={{ r: 8 }} />
		</LineChart>
		</ResponsiveContainer>
	);
}
