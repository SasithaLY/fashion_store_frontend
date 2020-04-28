import React, { useState } from "react";

const RadioSelector = ({ prices, handleFilters }) => {
    const [value, setValue] = useState(0);

    const handleTheChange = event => {
        handleFilters(event.target.value);
        setValue(event.target.value);
    };

    return prices.map((p, i) => (
        <div key={i} className="m-2">
            <input
                onChange={handleTheChange}
                value={`${p._id}`}
                name={p}
                type="radio"
                className="mr-2 ml-4"
            />
            <small className="form-check-label text-warning font-weight-bold">{p.name}</small>
        </div>
    ));
};

export default RadioSelector;
