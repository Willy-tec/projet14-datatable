import { useMemo, useState } from 'react';
import MainTable from '../component/MainTable';
import PaginationNavigation from '../component/PaginationNavigation';
import SearchInput from '../component/SearchInput';
import SelectPagination from '../component/SelectPagination';
import './style.css';
function DataTable({ id, className, data, columns }) {
    const [filterText, setFilterText] = useState('');
    const [tableLength, setTableLength] = useState(10);
    const [pageIndex, setPageIndex] = useState(1);
    const [sortingObject, setSortingObject] = useState({
        order: null,
        column: null,
    });
    const nbPage = Math.ceil(data?.length / tableLength);
    if (pageIndex > nbPage) setPageIndex(nbPage);

    let dataArray = filterData();
    function filterData() {
        let regex = new RegExp(filterText, 'i');
        return data.filter((el) => {
            for (let column in el) {
                let test = el[column].toString();
                if (test.match(regex)) return true;
            }
            return false;
        });
    }

    if (sortingObject.order && sortingObject.column) sorting(sortingObject);
    function sorting({ order, column }) {
        const asc = (a, b) => (a > b ? 1 : -1);
        const desc = (a, b) => (a < b ? 1 : -1);
        if (dataArray.length == 0) return;
        let isNumber = isNaN(Number(dataArray[0][column])) ? false : true;
        let isDate = !!(
            !isNumber && dataArray[0][column].match(/[0-9]+\/[0-9]+\/[0-9]+/g)
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

        dataArray.sort((a, b) => {
            if (isDate)
                return order == 'asc'
                    ? dateCompare(a[column], b[column])
                    : dateCompareDesc(a[column], b[column]);
            else if (isNumber)
                return fnCompare(Number(a[column]), Number(b[column]));
            else return fnCompare(a[column], b[column]);
        });
    }
    return (
        <section id="DataTable">
            <div className="DataTable-length">
                <SelectPagination setTableLength={setTableLength} />
                <SearchInput
                    filterText={filterText}
                    setFilterText={setFilterText}
                />
            </div>
            <MainTable
                title="okTitle"
                data={dataArray}
                columns={columns}
                currentPage={pageIndex}
                tableLength={tableLength}
                setSortingObject={setSortingObject}
            />
            <PaginationNavigation
                pageIndex={pageIndex}
                setPageIndex={setPageIndex}
                tableLength={tableLength}
                dataLength={dataArray.length}
            />
        </section>
    );
}

export default DataTable;
// TODO Découpage en plusieurs composants
// TODO Remettre en place les states et props comme il faut
