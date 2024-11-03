// src/components/SearchBox.jsx
import React, { useState } from 'react';
import '../App.css';
import { Form, Button } from 'react-bootstrap';

const SearchBox = ({ onSearch }) => {
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(input);
    };

    return (
        <Form onSubmit={handleSubmit} className="mb-4">
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Enter your question..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-2">Search</Button>
        </Form>
    );
};

export default SearchBox;
