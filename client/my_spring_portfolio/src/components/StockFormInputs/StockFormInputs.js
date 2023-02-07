import React, { useState, useEffect } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import axios from 'axios';

export function StockFormInputs({ selectedOption, setSelectedOption }) {
    const [suggestions, setSuggestions] = useState([]);

    const fetchSuggestions = async (AssetValue) => {
        const response = await axios.get(`https://ticker-2e1ica8b9.now.sh/keyword/${AssetValue}`);
        const { data } = response;
        setSuggestions(data);
    }

    const handleChange = (selected) => {
        setSelectedOption(selected);
        console.log(selectedOption)
    }

    return (
        <div>
            <AsyncTypeahead
                id="async-example"
                labelKey="name"
                minLength={3}
                onSearch={fetchSuggestions}
                onChange={handleChange}
                options={suggestions}
                placeholder="Search for a stock..."
                renderMenuItemChildren={(option, props) => (
                    <>
                    <div>
                        <span>{option.name}</span>
                        <span className="text-muted ml-2">{option.symbol}</span>
                    </div>
                    <div>
                        <span>{option.name}</span>
                        <span className="text-muted ml-2">{option.symbol}</span>
                    </div>
                    </>
                )}
            />
        </div>
    )
}
