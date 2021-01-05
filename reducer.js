export const initialState = {
  activeLoansSearch: [],
  activeLoansResult: [],
  basket: {},
}


export const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_ACTIVE_LOANS_SEARCH':
      return {
        ...state,
        activeLoansSearch: [...action.items]
      }

    case 'GET_ACTIVE_LOANS_RESULT':
      return {
        ...state,
        activeLoansResult: [...action.items]
      }

    case 'ALL_DATA_FOR_SEARCH':
      return {
        ...state,
        basket: { ...action.items }
      }

    default:
      return state;
  }
}

export default reducer;
