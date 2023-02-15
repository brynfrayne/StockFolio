import React, { useState } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import './StockFormInputs.css';
import axios from 'axios';

export function StockFormInputs({
                        selectedOption,
                        setSelectedOption,
                    }
                    ) {
    const [suggestions, setSuggestions] = useState([]);
    const stockAutoCompleteUrl = process.env.REACT_APP_autoComplete_StockName_apiUrl

    const fetchSuggestions = async (AssetName) => {
        const response = await axios.get(`${stockAutoCompleteUrl}/${AssetName}`);
        const { data } = response;
        setSuggestions(data);
    }

    const handleChange = (selected) => {
        setSelectedOption(selected);
    }

    return (
           <AsyncTypeahead
                id="async-example"
                labelKey="name"
                minLength={3}
                onSearch={fetchSuggestions}
                onChange={handleChange}
                options={suggestions}
                placeholder="Search for a stock by name..."
                renderMenuItemChildren={(option, _props) => (
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
    )
}
