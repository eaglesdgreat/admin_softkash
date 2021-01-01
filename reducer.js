export const initialState = {
  dashboardDatas: {},
}


export const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_ALL_DASHBOARD_DATA':
      return {
        ...state,
        dashboard_data: { ...action.items }
      }

    default:
      return state;
  }
}

export default reducer;
