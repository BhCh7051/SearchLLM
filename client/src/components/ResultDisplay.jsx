// src/components/ResultDisplay.jsx
import React from 'react';
import '../App.css';
import { Card } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

const ResultDisplay = ({ answer }) => (
    <Card className="mb-4">
        <Card.Body>
            <Card.Text>
                <ReactMarkdown>{answer}</ReactMarkdown>
            </Card.Text>
        </Card.Body>
    </Card>
);

export default ResultDisplay;
