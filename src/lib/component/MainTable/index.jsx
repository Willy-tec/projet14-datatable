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
}) {
    const [dataArray, setDataArray] = useState(data);
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
        sorting(sortingObject);
    }
    function sorting({ order, column }) {
        let tmp = [...dataArray];
        const asc = (a, b) => (a > b ? 1 : -1);
        const desc = (a, b) => (a < b ? 1 : -1);
        let isNumber = isNaN(Number(tmp[0][column])) ? false : true;
        let isDate = !!(
            !isNumber && tmp[0][column].match(/[0-9]+\/[0-9]+\/[0-9]+/g)
        );
        const dateCompare = (a, b) => {
            let aArr = a.split('/');
            let bArr = b.split('/');
            if (aArr[2] > bArr[2]) return 1;
            else if (aArr[2] < bArr[2]) return -1;
            else if (aArr[1] > bArr[1]) return 1;
            else if (aArr[1] < bArr[1]) return -1;
            else if (aArr[0] > bArr[0]) return 1;
            else if (aArr[0] < bArr[0]) return -1;
        };
        const dateCompareDesc = (a, b) => {
            let aArr = a.split('/');
            let bArr = b.split('/');
            if (aArr[2] < bArr[2]) return 1;
            else if (aArr[2] > bArr[2]) return -1;
            else if (aArr[1] < bArr[1]) return 1;
            else if (aArr[1] > bArr[1]) return -1;
            else if (aArr[0] < bArr[0]) return 1;
            else if (aArr[0] > bArr[0]) return -1;
        };

        let fnCompare = order === 'asc' ? asc : desc;

        tmp.sort((a, b) => {
            if (isDate)
                return order == 'asc'
                    ? dateCompare(a[column], b[column])
                    : dateCompareDesc(a[column], b[column]);
            else return fnCompare(a[column], b[column]);
        });
        setDataArray(tmp);
        // setPageIndex(1);
    }
    return (
        <table id={id ? id : null} className={className ? className : null}>
            <caption>{title}</caption>
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
                {dataArray
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
