import { FILTER_ACTIONS } from './actions';

const filter = { criteria: {}, page: 1, limit: 10, sort: [], order: 'asc' };
const orderOptions = ['asc', 'desc'];

const initialState = { filter, orderOptions };

const filterReducer = (state, action) => {
    switch (action.type) {
        case FILTER_ACTIONS.SET_CRITERIA:
            return {
                ...state,
                filter: { ...state.filter, page: 1, criteria: action.payload.criteria },
            };
        case FILTER_ACTIONS.SET_PAGE:
            return {
                ...state,
                filter: { ...state.filter, page: action.payload.page },
            };
        case FILTER_ACTIONS.SET_LIMIT:
            return {
                ...state,
                filter: { ...state.filter, page: 1, limit: action.payload.limit },
            };
        case FILTER_ACTIONS.SET_SORT:
            const newSort = state.filter.sort.includes(action.payload.sort)
                ? state.filter.sort.filter((item) => item !== action.payload.sort)
                : [...state.filter.sort, action.payload.sort];
            return { ...state, filter: { ...state.filter, sort: newSort } };
        case FILTER_ACTIONS.SET_ORDER:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    order: orderOptions.includes(action.payload.order) ? action.payload.order : 'asc',
                },
            };
        default:
            return state;
    }
};

export { filterReducer, initialState };
