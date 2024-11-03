// src/components/SourcesList.jsx
import React from 'react';
import '../App.css';
import { ListGroup } from 'react-bootstrap';

const SourcesList = ({ sources }) => (
    <div className="mb-4">
        <h5>Sources:</h5>
        <ListGroup>
            {sources.flat().map((source, index) => (
                <ListGroup.Item key={index} action href={source.link} target="_blank">
                    {source.title}
                </ListGroup.Item>
            ))}
        </ListGroup>
    </div>
);

export default SourcesList;
