// src/App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';
import { Container } from 'react-bootstrap';
import SearchBox from './components/SearchBox';
import ResultDisplay from './components/ResultDisplay';
import SourcesList from './components/SourcesList';
import FollowUpQuestions from './components/FollowUpQuestions';
import LoadingSpinner from './components/LoadingSpinner';
import api from './services/api';

function App() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState('');

    const fetchData = async () => {
        setLoading(true);
        const response = await api.postData(query);
        setData(response);
        setLoading(false);
    };

    useEffect(() => {
        if (query) fetchData();
    }, [query]);

    return (
        <Container>
            <SearchBox onSearch={setQuery} />
            {loading && <LoadingSpinner />}
            {data && (
                <>
                    <ResultDisplay answer={data.answer} />
                    <SourcesList sources={data.sources} />
                    <FollowUpQuestions questions={data.followUpQuestions} />
                </>
            )}
        </Container>
    );
}

export default App;
