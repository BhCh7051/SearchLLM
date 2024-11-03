// src/components/FollowUpQuestions.jsx
import React from 'react';
import '../App.css';
import { ListGroup } from 'react-bootstrap';

const FollowUpQuestions = ({ questions }) => (
    <div>
        <h5>Follow-Up Questions:</h5>
        <ListGroup>
            {questions.map((question, index) => (
                <ListGroup.Item key={index}>{question}</ListGroup.Item>
            ))}
        </ListGroup>
    </div>
);

export default FollowUpQuestions;
