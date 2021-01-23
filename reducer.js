export const initialState = {
  loansSearch: [],
  activeLoansResult: [],
  pendingApprovedLoans: [],
  rejectedLoans: [],

  messagesSearch: [],
  messagesResult: [],

  employeesSearch: [],
  employeesResult: [],

  adminsSearch: [],
  adminsResult: [],

  loginDialog: false
}


export const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_ACTIVE_LOANS_SEARCH':
      return {
        ...state,
        loansSearch: [...action.items]
      }

    case 'GET_ACTIVE_LOANS_RESULT':
      return {
        ...state,
        activeLoansResult: [...action.items]
      }

    case 'GET_PENDING_APPROVED_LOANS':
      return {
        ...state,
        pendingApprovedLoans: [...action.items]
      }

    case 'GET_REJECTED_LOANS':
      return {
        ...state,
        rejectedLoans: [...action.items]
      }

    case 'GET_MESSAGES_SEARCH':
      return {
        ...state,
        messagesSearch: [...action.items]
      }

    case 'GET_MESSAGES_RESULT':
      return {
        ...state,
        messagesResult: [...action.items]
      }

    case 'GET_EMPLOYEES_SEARCH':
      return {
        ...state,
        employeesSearch: [...action.items]
      }

    case 'GET_EMPLOYEES_RESULT':
      return {
        ...state,
        employeesResult: [...action.items]
      }

    case 'GET_ADMINS_SEARCH':
      return {
        ...state,
        adminsSearch: [...action.items]
      }

    case 'GET_ADMINS_RESULT':
      return {
        ...state,
        adminsResult: [...action.items]
      }

    case 'OPEN_LOGIN_DIALOG':
      return {
        ...state,
        loginDialog: action.items
      }

    default:
      return state;
  }
}

export default reducer;
