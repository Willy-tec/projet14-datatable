import { useMemo, useState } from 'react';
import MainTable from '../component/MainTable';
import PaginationNavigation from '../component/PaginationNavigation';
import SearchInput from '../component/SearchInput';
import SelectPagination from '../component/SelectPagination';
import './style.css';
function DataTable({ id, className, data, columns }) {
    const [filterText, setFilterText] = useState('');
    const [tableLength, setTableLength] = useState(10);
    const [dataFilter, setDataFilter] = useState(data);
    const [pageIndex, setPageIndex] = useState(1);
    //const [isFiltered, setIsFiltered] = useState(false);
    let nbPage = Math.ceil(dataFilter?.length / tableLength);
    if (pageIndex > nbPage) setPageIndex(nbPage);

    // Fonction pour filtrer le contenu du tableau. On "memoize" les valeurs pour ne pas recalculer systematiquement.
    const memoized = useMemo(() => filterData(), [filterText]);
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
                data={memoized}
                columns={columns}
                currentPage={pageIndex}
                tableLength={tableLength}
            />
            <PaginationNavigation
                pageIndex={pageIndex}
                setPageIndex={setPageIndex}
                tableLength={tableLength}
                dataLength={memoized.length}
            />
        </section>
    );
}

export default DataTable;
// TODO Découpage en plusieurs composants
// TODO Remettre en place les states et props comme il faut
