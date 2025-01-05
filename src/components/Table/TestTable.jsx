import { useState, useEffect, useReducer } from 'react';
import get from 'lodash/get';
import { Table, TableContainer, TablePagination, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { Paper, Typography, Box, Checkbox } from '@mui/material';
import { FaArrowDown } from 'react-icons/fa6';
import { FaRegPlusSquare } from 'react-icons/fa';
import { FaRegEdit } from 'react-icons/fa';
import { FaRegTrashAlt } from 'react-icons/fa';
import { IoFilter } from 'react-icons/io5';
import { FaRegEye } from 'react-icons/fa';
import classNames from 'classnames';
import { useModal } from '~/hooks';
import { filterReducer, initialState } from '~/store/reducers/filterReducer';
import { FormControl, Select, InputLabel, MenuItem } from '@mui/material';
import { FILTER_ACTIONS } from '~/store/reducers/actions';

const TestTable = ({ label = 'Datatable', searchBar = [], headers, modals, sizeOptions, apiServices }) => {
    const { modal, openModal } = useModal();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState([]);
    const [total, setTotal] = useState(0);

    const [state, dispatch] = useReducer(filterReducer, {
        ...initialState,
        filter: {
            ...initialState.filter,
            criteria: searchBar?.reduce((acc, item) => {
                acc[item.id] = null;
                return acc;
            }, {}),
            limit: sizeOptions[0],
        },
    });

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await apiServices.get(state.filter);
            console.log("state.filter ne heheh: ", state.filter);
            console.log("API SERVICES NE HAHA: ", apiServices);
            console.log("response ne heheh: ", response);
            setData(response.records);
            setTotal(response.totalRecords);
            setLoading(false);
            setSelected([]);
        } catch (error) {
            alert(`Failed to fetch data: ${error.message || 'Unknown error'}`);
            setLoading(false);
            setSelected([]);
        }
    };

    const handleSelectCriteria = (event) => {
        console.log("event: ", event);
        dispatch({
            type: FILTER_ACTIONS.SET_CRITERIA,
            payload: { criteria: { ...state.filter.criteria, [event.target.name]: event.target.value } },
        });
        console.log("state.filter.criteria: ", state.filter.criteria);
    }

    useEffect(() => {
        fetchData();
    }, [state]);

    const handleChangePage = (event, newPage) => {
        dispatch({ type: FILTER_ACTIONS.SET_PAGE, payload: { page: newPage + 1 } });
    };

    const handleChangeSize = (event) => {
        dispatch({ type: FILTER_ACTIONS.SET_LIMIT, payload: { limit: event.target.value } });
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
                <Typography variant="h6" component="div" sx={{ px: 3, py: 3 }}>
                    <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-txt">{label}</span>

                        {Array.isArray(searchBar) && searchBar.length > 0 ? (
                            <div>
                                {searchBar.map((item) => {
                                    return item.type === 'select' ? (
                                        <div className="pb-4 w-[320px]" key={item}>
                                            <FormControl fullWidth>
                                                <InputLabel>{item.label}</InputLabel>
                                                <Select
                                                    id={item.id}
                                                    value={state.filter.criteria[item.id]}
                                                    label={item.label}
                                                    onChange={handleSelectCriteria}
                                                    name={item.name}
                                                >
                                                    {item.data?.map((item, index) => (
                                                        <MenuItem key={index} value={item.id}>
                                                            {item.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </div>
                                    ) : null;
                                })}
                            </div>
                        ) : null}

                        <div className="flex items-center gap-x-3">
                            {modals.Inspect ? (
                                <IconButton
                                    isEnabled={selected.length === 1}
                                    onClick={() =>
                                        openModal(
                                            <modals.Inspect data={data.find((item) => item.id === selected[0])} />
                                        )
                                    }
                                >
                                    <FaRegEye className="text-xl" />
                                </IconButton>
                            ) : null}

                            {modals.Create ? (
                                <IconButton isEnabled={true} onClick={() => openModal(<modals.Create />)}>
                                    <FaRegPlusSquare className="text-xl" />
                                </IconButton>
                            ) : null}

                            {modals.Edit ? (
                                <IconButton
                                    isEnabled={selected.length === 1}
                                    onClick={() =>
                                        openModal(<modals.Edit data={data.find((item) => item.id === selected[0])} />)
                                    }
                                >
                                    <FaRegEdit className="text-xl" />
                                </IconButton>
                            ) : null}

                            {modals.Delete ? (
                                <IconButton
                                    isEnabled={selected.length > 0}
                                    onClick={() => openModal(<modals.Delete ids={selected} />)}
                                >
                                    <FaRegTrashAlt className="text-xl" />
                                </IconButton>
                            ) : null}

                            {modal}

                            {
                                <IconButton
                                    isEnabled={state.filter.sort.length > 0}
                                    isSpinning={state.filter.order === 'desc'}
                                    onClick={() => handleChangeOrder(state.filter.order === 'asc' ? 'desc' : 'asc')}
                                >
                                    <IoFilter className="text-xl" />
                                </IconButton>
                            }
                        </div>
                    </div>
                </Typography>

                <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="a dense table" size="big">
                        <TableHead>
                            <TableRow key={0}>
                                <TableCell key={0} align="center" width="5%">
                                    <input
                                        type="checkbox"
                                        onClick={() =>
                                            selected.length === 0
                                                ? setSelected(data.map((item) => item.id).sort())
                                                : setSelected([])
                                        }
                                        checked={selected.length != 0}
                                        className="text-lg hover:cursor-pointer"
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
                                                <span className="whitespace-nowrap text-txt">{header.label}</span>

                                                {state.filter.order === 'asc' ? (
                                                    <FaArrowDown
                                                        className={classNames(
                                                            state.filter.sort.includes(header.id)
                                                                ? 'text-secondary'
                                                                : 'text-transparent',
                                                            'absolute right-[-22px] z-50 text-sm duration-500 ease-in-out group-hover:text-secondary'
                                                        )}
                                                    />
                                                ) : (
                                                    <FaArrowDown
                                                        className={classNames(
                                                            state.filter.sort.includes(header.id)
                                                                ? 'text-secondary'
                                                                : 'text-transparent',
                                                            'absolute right-[-22px] z-10 rotate-180 text-sm transition-transform duration-500 ease-in-out group-hover:text-secondary'
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
                                                  className="text-lg hover:cursor-pointer"
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
                                                  {(() => {
                                                      switch (header.type) {
                                                          case 'boolean':
                                                              return <Checkbox checked={get(item, header.id)} />;
                                                          case 'array':
                                                              return (
                                                                  <div className="flex">
                                                                      {Array.isArray(get(item, header.id)) &&
                                                                          get(item, header.id).map(
                                                                              (arrayItem, index) => (
                                                                                  <ArrayItem
                                                                                      key={index}
                                                                                      text={arrayItem}
                                                                                  />
                                                                              )
                                                                          )}
                                                                  </div>
                                                              );
                                                          case 'image':
                                                              return <ImageItem className='w-11 h-11 overflow-hidden object-cover' src={get(item, header.id)} />;
                                                          case 'text':
                                                              return get(item, header.id);
                                                          default:
                                                              return get(item, header.id);
                                                      }
                                                  })()}
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
                        count={total ?? 0}
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

const ArrayItem = ({ text }) => {
    return (
        <div className="my-1 me-2 flex w-fit flex-row items-center rounded-full bg-secondary_bg px-4 py-1 text-secondary transition duration-150 hover:bg-secondary hover:text-secondary_bg">
            <span className="text-xs font-medium">{text}</span>
        </div>
    );
};

const ImageItem = ({ height = '32px', width = '32px', src = '', ...props }) => {
    return <img src={src} height={height} width={width} {...props} />;
};

const IconButton = ({ isEnabled = true, isSpinning = false, onClick, children }) => {
    return (
        <button
            disabled={!isEnabled}
            onClick={onClick}
            className={classNames(
                isEnabled ? 'text-primary' : 'text-disabled',
                'text-xl duration-500 ease-in-out',
                isSpinning ? 'rotate-180' : 'rotate-0',
                'transition-transform'
            )}
        >
            {children}
        </button>
    );
};

export default TestTable;
