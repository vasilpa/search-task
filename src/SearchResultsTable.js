import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from "@material-ui/core/TablePagination";
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import SortIcon from '@material-ui/icons/Sort';
import useLongPress from "./useLongPress";

const SearchResultsTable = props => {
    const [results, setResults] = useState(props.results);
    const [ordered, setOrdered] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);


    const orderBy = (by) => {
        setOrdered(!ordered);
        const orderedResults = [...results].sort(function (a, b) {
            if (Number.isInteger(a[by])) {
                return ordered ? a[by] - b[by] : b[by] - a[by];
            } else {
                return ordered ? a[by].localeCompare(b[by]) : b[by].localeCompare(a[by]);
            }
        });

        setResults(orderedResults);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const onLongPress = (e) => {
        props.setSelectedCountry(e.target.parentNode.getAttribute('data-name'));
    };

    const longPressEvent = useLongPress(onLongPress, { shouldPreventDefault: true, delay: 3000, }, props.setCounter);
    
    return (
        <div>
            <TableContainer component={Paper} className="employee-table">
                <h3>Search results Table</h3>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell onClick={() => orderBy('name')}>
                                <span className="th-title">Name</span>
                                <span>
                                    <Tooltip title="Order Alphabetically">
                                        <SortByAlphaIcon />
                                    </Tooltip>
                                </span>
                            </TableCell>
                            <TableCell onClick={() => orderBy('capital')}>
                                <span className="th-title">Capital</span>
                                <span>
                                    <Tooltip title="Order Alphabetically">
                                        <SortByAlphaIcon />
                                    </Tooltip>
                                </span>
                            </TableCell>
                            <TableCell onClick={() => orderBy('population')}>
                                <span className="th-title">Population</span>
                                <span>
                                    <Tooltip title="Sort by Population">
                                        <SortIcon />
                                    </Tooltip>
                                </span>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {results
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((country, i) => {
                                return (<TableRow {...longPressEvent}
                                    data-name={country.name}
                                    key={`${country.numericCode}`}
                                    >
                                    <TableCell>{i + 1}</TableCell>
                                    <TableCell>{country.name}
                                    </TableCell>
                                    <TableCell>{country.capital}</TableCell>
                                    <TableCell>{country.population}</TableCell>
                                </TableRow>
                                )
                            })}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={results.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </TableContainer>
        </div>
    );
}

export default SearchResultsTable;
