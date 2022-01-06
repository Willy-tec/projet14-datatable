import React, { useState } from 'react';
import './style.css';
function MainTable({
    title,
    id,
    className,
    data,
    columns,
    currentPage,
    tableLength,
    setSortingObject,
}) {
    const refArr = columns.map((el) => React.createRef());
    const refCorres = columns.map((el) => el.data);
    function handleSortingColumn({ target }) {
        let finding = target.dataset.sortingLabel;
        let index = refCorres.indexOf(finding);
        let tmpClass = refArr[index].current.className;
        let sortingObject = {
            order: null,
            column: null,
        };
        refArr.forEach((el) => (el.current.className = 'sorting'));
        if (tmpClass === 'sorting' || tmpClass === 'sorting desc') {
            refArr[index].current.className = 'sorting asc';
            sortingObject.order = 'asc';
        } else {
            refArr[index].current.className = 'sorting desc';
            sortingObject.order = 'desc';
        }
        sortingObject.column = target.dataset.sortingLabel;
        setSortingObject(sortingObject);
    }

    return (
        <table id={id ? id : null} className={className ? className : null}>
            <thead>
                <tr onClick={handleSortingColumn}>
                    {columns?.map((el, index) => (
                        <th
                            key={`${el}${index}`}
                            className="sorting"
                            data-sorting-label={el.data}
                            ref={refArr[index]}
                        >
                            {el.title}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data
                    ?.slice(
                        (currentPage - 1) * tableLength,
                        currentPage * tableLength
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
    );
}

export default MainTable;
