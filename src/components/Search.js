import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
    const [input, setInput] = useState('programming');
    const [debouncedInput, setDebouncedInput] = useState(input);
    const [results, setResults] = useState([]);


    useEffect(() => {
        const timerID = setTimeout(() => {
            setDebouncedInput(input);
        }, 1200);

        return () => {
            clearTimeout(timerID);
        };

    }, [input]);

    useEffect(() => {
        const searchWiki = async () => {
            const { data } = await axios.get('https://en.wikipedia.org/w/api.php', {
                params: {
                    action: 'query',
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: debouncedInput,
                },
            });

            setResults(data.query.search);
        };
        searchWiki();

    }, [debouncedInput]);

    const renderResults = results.map((result) => {
        return (
            <div className="item" key={result.pageid}>
                <div className="right floated content">
                    <a 
                        className="ui button"
                        href={`https://en.wikipedia.org?curid=${result.pageid}`}
                    >   
                        Go
                    </a>
                </div>
                <div className="content">
                    <div className="header">
                        {result.title}
                    </div>
                    <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
                </div>
            </div>
        )
    })

    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Enter Search Term</label>
                    <input 
                        className="input" 
                        value={input}
                        onChange={e => setInput(e.target.value)}
                    />
                </div>
            </div>

            <div className="ui celled list">
                {renderResults}
            </div>
        </div>
    );
}

export default Search;