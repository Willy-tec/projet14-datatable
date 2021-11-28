import { useState } from 'react';
import './style.css';
function DataTable({ id, className, data, columns }) {
    const [tableLength, setTableLength] = useState(10);
    const [dataFilter, setDataFilter] = useState(data);
    const [pageIndex, setPageIndex] = useState(1);
    let nbPage = Math.ceil(dataFilter?.length / tableLength);
    if (pageIndex > nbPage) setPageIndex(nbPage);
    function handleSelectChange() {
        let len = document.querySelector('#DataTable-length-select').value;
        setTableLength(+len);
        setPageIndex(1);
    }
    function handlePageClick({ target }) {
        setPageIndex(target.dataset.dtIdx);
    }
    function findTheDot(arrLen, currentPos, tableLen) {
        const MAX_BUTTON = 7;
        const NB_PAGE = Math.ceil(arrLen / tableLen);
        let shouldWeDot = NB_PAGE > MAX_BUTTON;
        let arr = [];
        if (shouldWeDot) {
            let dotAtStart = currentPos > NB_PAGE - 4,
                dotAtEnd = currentPos <= 4;
            if (dotAtEnd) {
                for (let i = 1; i <= MAX_BUTTON - 2; ++i) {
                    arr.push(i);
                }
                arr.push('...');
                arr.push(NB_PAGE);
            } else if (dotAtStart) {
                arr.push(1);
                arr.push('...');
                for (let i = NB_PAGE - 4; i <= NB_PAGE; ++i) {
                    arr.push(i);
                }
            } else {
                arr.push(1);
                arr.push('...');
                arr.push(Number(currentPos) - 1);
                arr.push(Number(currentPos));
                arr.push(Number(currentPos) + 1);
                arr.push('...');
                arr.push(NB_PAGE);
            }
        } else {
            for (let i = 1; i <= NB_PAGE; ++i) {
                arr.push(i);
            }
        }
        return arr;
    }
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
    function handleSortingColumn({ target }) {
        let tmp = target.className;
        let sortingObject = {
            order: 'none',
            column: 'none',
        };

        document
            .querySelectorAll('.sorting')
            .forEach((el) => (el.className = 'sorting'));
        if (tmp === 'sorting' || tmp === 'sorting desc') {
            target.className = 'sorting asc';
            sortingObject.order = 'asc';
        } else if (tmp === 'sorting asc') {
            target.className = 'sorting desc';
            sortingObject.order = 'desc';
        }
        sortingObject.column = target.dataset.sortingLabel;
        sorting(sortingObject);
    }
    function sorting({ order, column }) {
        let tmp = [...dataFilter];
        order === 'asc'
            ? tmp.sort((a, b) => {
                  if (new Date(a[column]).toString() !== 'Invalid Date')
                      return new Date(a[column]) > new Date(b[column]);
                  else if (typeof a[column] === 'number')
                      return a[column] > b[column];
                  else if (typeof a[column] === 'string')
                      return a[column].toUpperCase() > b[column].toUpperCase();
                  else return -1;
              })
            : tmp.sort((a, b) => {
                  if (new Date(a[column]).toString() !== 'Invalid Date')
                      return new Date(a[column]) < new Date(b[column]);
                  else if (typeof a[column] === 'number')
                      return a[column] < b[column];
                  else if (typeof a[column] === 'string')
                      return a[column].toUpperCase() < b[column].toUpperCase();
                  else return -1;
              });
        setDataFilter(tmp);
        setPageIndex(1);
    }
    return (
        <section id="DataTable">
            <div className="DataTable-length">
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
                <label>
                    Search:{' '}
                    <input
                        id="search_input"
                        type="search"
                        placeholder=""
                        onChange={handleChangeSearch}
                    ></input>
                </label>
            </div>
            <table id={id ? id : null} className={className ? className : null}>
                <thead>
                    <tr onClick={handleSortingColumn}>
                        {columns?.map((el, index) => (
                            <th
                                key={`${el}${index}`}
                                className="sorting"
                                data-sorting-label={el.data}
                            >
                                {el.title}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {dataFilter
                        ?.slice(
                            (pageIndex - 1) * tableLength,
                            pageIndex * tableLength
                        )
                        .map((dataEl, dataIndex) => (
                            <tr key={`tr-${dataIndex}`}>
                                {columns?.map((col, colIndex) => (
                                    <td key={`td-${colIndex}`}>
                                        {dataEl[col.data]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                </tbody>
            </table>
            <div className="result_div">
                <span>
                    Showing {1 + (pageIndex - 1) * tableLength} to{' '}
                    {pageIndex * tableLength} of {dataFilter?.length} entries
                </span>

                <span className="result_div_span">
                    Page n°:{pageIndex}{' '}
                    {findTheDot(dataFilter?.length, pageIndex, tableLength).map(
                        (el, index) =>
                            el === '...' ? (
                                <span key={`link${index}`}>...</span>
                            ) : (
                                <button
                                    key={`link${index}`}
                                    data-dt-idx={el}
                                    onClick={handlePageClick}
                                >
                                    {el}
                                </button>
                            )
                    )}
                </span>
            </div>
        </section>
    );
}

export default DataTable;
// TODO Découpage en plusieurs composants
// TODO Remettre en place les states et props comme il faut
