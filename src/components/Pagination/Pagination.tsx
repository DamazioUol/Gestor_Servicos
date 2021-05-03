import React from "react";
import { IPagination } from "../../models/Pagination/IPagination.interface";


const cssColorBlack: React.CSSProperties = {
    color: 'black'
}

const Pagination = (filter: IPagination) => {
    const pageNumbers = new Array<number>();
    const numberPages = Math.ceil((filter?.totalCount || 0) / filter.pageSize);
    const pageCurrent = filter.page <= 0 ? 1 : filter.page;

    for (let index = 1; index <= numberPages; index++) {
        pageNumbers.push(index);
    }

    const classDisabledNextPage = (pageCurrent === pageNumbers.length ? 'uk-disabled' : (pageNumbers.length == 0 ? 'uk-disabled' : ''));
    const classDisabledPreviousPage = (pageCurrent <= 1 ? 'uk-disabled' : '');

    const cssPaginationNext = (classDisabledNextPage === 'uk-disabled' ? undefined : cssColorBlack);
    const cssPaginationPrevious = (classDisabledPreviousPage === 'uk-disabled' ? undefined : cssColorBlack);

    const cssPageCurrent = (num: number) => (pageCurrent === num ? cssColorBlack : undefined);

    return (
        <nav>
            <ul className="uk-pagination uk-flex-center" uk-margin='true'>
                <li className={classDisabledPreviousPage}>
                    <a
                        href="#"
                        onClick={() => filter.paginationFunction(pageCurrent - 1)}
                    >
                        <span style={cssPaginationPrevious} uk-pagination-previous="true"></span>
                    </a>
                </li>
                {pageNumbers.map((number, index) => {
                    return (
                        <li key={index}>
                            <a
                                href="#"
                                onClick={() => filter.paginationFunction(number)}
                                style={cssPageCurrent(number)}
                            >
                                {number}
                            </a>
                        </li>
                    )
                })}
                <li className={classDisabledNextPage}>
                    <a
                        href="#"
                        onClick={() => filter.paginationFunction(pageCurrent + 1)}
                    >
                        <span style={cssPaginationNext} uk-pagination-next="true"></span>
                    </a>
                </li>
            </ul>
        </nav>
    )

}

export default Pagination;