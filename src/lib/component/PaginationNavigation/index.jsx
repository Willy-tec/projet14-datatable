import React, { useState } from 'react';

import './style.css';

function PaginationNavigation({
    pageIndex,
    setPageIndex,
    tableLength,
    dataLength,
}) {
    const minNumberPage = 1 + (pageIndex - 1) * tableLength;
    const maxNumberPage = pageIndex * tableLength;
    const NB_PAGE = Math.ceil(dataLength / tableLength);

    function findTheDot(currentPos) {
        const MAX_BUTTON = 7;
        let shouldWeDot = NB_PAGE > MAX_BUTTON;
        let arr = [];
        arr.push('Previous');
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
        arr.push('Next');

        return arr;
    }
    function handlePageClick({ target }) {
        setPageIndex(target.dataset.dtIdx);
    }
    function handlePrevious({ target }) {
        const page = pageIndex > 1 ? +pageIndex - 1 : 1;
        setPageIndex(page);
    }
    function handleNext({ target }) {
        const page = pageIndex < NB_PAGE ? +pageIndex + 1 : NB_PAGE;
        setPageIndex(page);
    }
    return (
        <div className="PaginationNavigation">
            <span>
                Showing{' '}
                {minNumberPage < 0
                    ? 0
                    : minNumberPage > dataLength
                    ? dataLength
                    : minNumberPage}{' '}
                to {maxNumberPage > dataLength ? dataLength : maxNumberPage} of{' '}
                {dataLength} entries
            </span>

            <span className="PaginationNavigation_span">
                Page n°:{pageIndex}{' '}
                {findTheDot(pageIndex).map((el, index) => {
                    switch (el) {
                        case '...':
                            return <span key={`link${index}`}> ... </span>;
                        case 'Next':
                            return (
                                <button
                                    disabled={pageIndex >= NB_PAGE}
                                    key={`link${index}`}
                                    onClick={handleNext}
                                    className="iterableButton"
                                >
                                    {el}
                                </button>
                            );
                        case 'Previous':
                            return (
                                <button
                                    disabled={pageIndex <= 1}
                                    key={`link${index}`}
                                    onClick={handlePrevious}
                                    className="iterableButton"
                                >
                                    {el}
                                </button>
                            );
                        default:
                            return (
                                <button
                                    key={`link${index}`}
                                    data-dt-idx={el}
                                    onClick={handlePageClick}
                                >
                                    {el}
                                </button>
                            );
                    }
                })}
            </span>
        </div>
    );
}

export default PaginationNavigation;
// TODO désactiver les boutons next/previous
