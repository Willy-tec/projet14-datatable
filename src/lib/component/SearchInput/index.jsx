import { useState } from 'react';
import './style.css';
function SearchInput({ filterText, setFilterText }) {
    function handleChangeSearch({ target }) {
        setFilterText(target.value);
    }
    return (
        <label>
            Search:{' '}
            <input
                id="search_input"
                type="search"
                placeholder=""
                value={filterText}
                onChange={handleChangeSearch}
            ></input>
        </label>
    );
}

export default SearchInput;

/*
	function handleChangeSearch() {
        let str = document.querySelector('#search_input').value;
        let tmp = [];
        let regex = new RegExp(str, 'i');
        tmp = data.filter((el) => {
            let isOk = false;
            for (let column in el) {
                let test = el[column].toString();
                if (test.match(regex)) isOk = true;
            }
            return isOk;
        });
        setDataFilter(tmp);
        setPageIndex(1);
    }

	*/
