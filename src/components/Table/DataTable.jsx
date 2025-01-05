import { useState, useEffect, useReducer, memo } from 'react';
import { Table, TableContainer, TablePagination, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { Paper, Typography, Box, Checkbox } from '@mui/material';
import { FaArrowDown } from 'react-icons/fa6';
import { FaRegPlusSquare } from 'react-icons/fa';
import { FaRegEdit } from 'react-icons/fa';
import { FaRegTrashAlt } from 'react-icons/fa';
import { IoFilter } from 'react-icons/io5';
import classNames from 'classnames';
import { useModal } from '~/hooks';
import { filterReducer, initialState } from '~/store/reducers/filterReducer';
import { FILTER_ACTIONS } from '~/store/reducers/actions';

const DataTable = ({ headers, modals, sizeOptions, apiServices }) => {
    console.log('DataTable rendered');

    const { modal, closeModal, openModal } = useModal();
    const { get } = apiServices;

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState([]);

    const [state, dispatch] = useReducer(filterReducer, {
        ...initialState,
        filter: { ...initialState.filter, limit: sizeOptions[0] },
    });

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await apiServices.get(state.filter);
            setData(response.data);
            setLoading(false);
            setSelected([]);
        } catch (error) {
            alert(`Failed to fetch data: ${error.message || 'Unknown error'}`);
            setLoading(false);
            setSelected([]);
        }
    };

    useEffect(() => {
        fetchData();
    }, [state]);

    const handleChangePage = (event, newPage) => {
        dispatch({ type: FILTER_ACTIONS.SET_PAGE, payload: { page: newPage + 1 } });
    };

    const handleChangeSize = (event) => {
        dispatch({
            type: FILTER_ACTIONS.SET_LIMIT,
            payload: { limit: event.target.value },
        });
    };

    const handleChangeSort = (criteria) => {
        dispatch({ type: FILTER_ACTIONS.SET_SORT, payload: { sort: criteria } });
    };

    const handleChangeOrder = (order) => {
        dispatch({ type: FILTER_ACTIONS.SET_ORDER, payload: { order: order } });
    };

    return (
        <Box sx={{ width: '100%' }} disabled={loading}>
            <Paper sx={{ width: '100%', mb: 2 }} elevation={0}>
                <Typography variant="h6" component="div" sx={{ px: 3, py: 3 }} className="bg-skin-base">
                    <div className="flex items-center justify-between text-skin">
                        <span className="text-xl font-bold">Posts</span>

                        <div className="flex items-center">
                            {modals.Create ? (
                                <button onClick={() => openModal(<modals.Create />)} className="me-5 text-skin-primary">
                                    <FaRegPlusSquare className="text-xl" />
                                </button>
                            ) : null}

                            {modals.Edit ? (
                                <button
                                    disabled={selected.length > 1 || selected.length == 0}
                                    onClick={() => openModal(<modals.Edit data={data.find((item) => item.id === selected[0])} />)}
                                    className={classNames(
                                        selected.length > 1 || selected.length == 0 ? 'text-skin-utility' : 'text-skin-primary',
                                        'me-5 transition duration-100 ease-in-out'
                                    )}
                                >
                                    <FaRegEdit className="text-xl" />
                                </button>
                            ) : null}

                            {modals.Delete ? (
                                <button
                                    disabled={selected.length === 0}
                                    onClick={() => openModal(<modals.Delete ids={selected} />)}
                                    className={classNames(selected.length < 1 ? 'text-skin-utility' : 'text-skin-primary', 'me-5 transition duration-100 ease-in-out')}
                                >
                                    <FaRegTrashAlt className="text-xl" />
                                </button>
                            ) : null}

                            {modal}

                            <button className="me-3" disabled={state.filter.sort.length === 0}>
                                {state.filter._order === 'asc' ? (
                                    <IoFilter
                                        onClick={() => handleChangeOrder('desc')}
                                        className={classNames(state.filter.sort.length === 0 ? 'text-skin-utility' : 'text-skin-primary', 'text-xl duration-500 ease-in-out')}
                                    />
                                ) : (
                                    <IoFilter
                                        onClick={() => handleChangeOrder('asc')}
                                        className={classNames(
                                            state.filter.sort.length === 0 ? 'text-skin-utility' : 'text-skin-primary',
                                            'rotate-180 text-xl transition-transform duration-500 ease-in-out'
                                        )}
                                    />
                                )}
                            </button>
                        </div>
                    </div>
                </Typography>

                <TableContainer className="bg-skin-base">
                    <Table sx={{ minWidth: 650 }} aria-label="a dense table" size="big">
                        <TableHead>
                            <TableRow key={0}>
                                <TableCell key={0} align="center" width="5%">
                                    <input
                                        type="checkbox"
                                        onClick={() => (selected.length === 0 ? setSelected(data.map((item) => item.id).sort()) : setSelected([]))}
                                        checked={selected.length != 0}
                                        className="h-3 w-3 appearance-none rounded-sm border border-skin-utility-dark bg-skin-base text-lg accent-skin-primary hover:cursor-pointer"
                                    />
                                </TableCell>
                                {headers.map((header) => (
                                    <TableCell key={header.id} align={header.dataAlign} width={header.width}>
                                        <button
                                            className={`group flex flex-row items-center ${header.labelAlign} w-full font-bold`}
                                            onClick={() => handleChangeSort(header.id)}
                                            disabled={loading}
                                        >
                                            <div className="relative flex items-center">
                                                <span className="whitespace-nowrap text-skin">{header.label}</span>

                                                {state.filter._order === 'asc' ? (
                                                    <FaArrowDown
                                                        className={classNames(
                                                            state.filter.sort.includes(header.id) ? 'text-skin-secondary' : 'text-transparent',
                                                            'absolute right-[-22px] z-50 text-sm duration-500 ease-in-out group-hover:text-skin-secondary'
                                                        )}
                                                    />
                                                ) : (
                                                    <FaArrowDown
                                                        className={classNames(
                                                            state.filter.sort.includes(header.id) ? 'text-skin-secondary' : 'text-transparent',
                                                            'absolute right-[-22px] z-10 rotate-180 text-sm transition-transform duration-500 ease-in-out group-hover:text-skin-secondary'
                                                        )}
                                                    />
                                                )}
                                            </div>
                                        </button>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {data
                                ? data.map((item) => (
                                      <TableRow key={item.id}>
                                          <TableCell align="center" width="5%" key={item.id}>
                                              <input
                                                  type="checkbox"
                                                  className="h-3 w-3 appearance-none rounded-sm border border-skin-utility-dark bg-skin-base text-lg checked:bg-skin-secondary hover:cursor-pointer"
                                                  onClick={() =>
                                                      selected.includes(item.id)
                                                          ? setSelected(selected.filter((id) => id !== item.id).sort())
                                                          : setSelected([...selected, item.id].sort())
                                                  }
                                                  checked={selected.includes(item.id)}
                                              />
                                          </TableCell>

                                          {headers.map((header) => (
                                              <TableCell key={header.id} align={header.dataAlign} width={header.width}>
                                                  {typeof item[header.id] === 'boolean' ? <Checkbox checked={item[header.id]} /> : item[header.id]}
                                              </TableCell>
                                          ))}
                                      </TableRow>
                                  ))
                                : []}
                        </TableBody>
                    </Table>

                    <TablePagination
                        disabled={loading}
                        rowsPerPageOptions={sizeOptions}
                        component="div"
                        count={100}
                        rowsPerPage={state.filter.limit}
                        page={state.filter.page - 1}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeSize}
                    />
                </TableContainer>
            </Paper>
        </Box>
    );
};

export default memo(DataTable);
