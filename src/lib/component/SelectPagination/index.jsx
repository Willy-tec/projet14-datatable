import './style.css';
import React from 'react';

function SelectPagination({ setTableLength }) {
    function handleSelectChange({ target }) {
        setTableLength(target.value);
    }
    return (
        <label htmlFor="DataTable-length-select">
            Show{' '}
            <select
                name="DataTable-length-select"
                id="DataTable-length-select"
                onChange={handleSelectChange}
            >
                <option>10</option>
                <option>20</option>
                <option>50</option>
                <option>100</option>
            </select>{' '}
            entries
        </label>
    );
}

export default SelectPagination;
