import React from 'react'
import useSWR, { mutate } from 'swr'
import { useRouter } from 'next/router'
import axios from 'axios'

import { useStateValue } from './../StateProviders';



const fetcher = async (...arg) => {
  // const [url, token] = arg
  const [url] = arg

  const response = await axios.get(
    url,
    // { headers: { authenticate: token } }
  )

  return response.data
}

// const employeesData = () => {
//   // const router = useRouter()

//   const url = `${process.env.BACKEND_URL}/api/employers`

//   // const token = isAuthenticated().authToken

//   const { data, error } = useSWR([url], fetcher, { shouldRetryOnError: false })

//   // const employeesCount = error ? '' : (!error && !data) ? '' : data

//   return {
//     employees: data,
//     isLoading: !error && !data,
//     isError: error
//   }
// }


// const messagesData = () => {
//   // const router = useRouter()

//   const url = `${process.env.BACKEND_URL}/api/contacts`

//   // const token = isAuthenticated().authToken

//   const { data, error } = useSWR([url], fetcher, { shouldRetryOnError: false })

//   return {
//     messages: data,
//     isLoadingMessages: !error && !data,
//     isErrorMessages: error
//   }
// }


// const adminsData = () => {
//   // const router = useRouter()

//   const url = `${process.env.BACKEND_URL}/api/admins`

//   // const token = isAuthenticated().authToken

//   const { data, error } = useSWR([url], fetcher, { shouldRetryOnError: false })

//   return {
//     admins: data,
//     isLoadingAdmins: !error && !data,
//     isErrorAdmins: error
//   }
// }


// const loansRejectedData = () => {
//   // const router = useRouter()

//   const url = `${process.env.BACKEND_URL}/api/loans/by_status/rejected`

//   // const token = isAuthenticated().authToken

//   const { data, error } = useSWR([url], fetcher, { shouldRetryOnError: false })

//   return {
//     loansRejected: data,
//     isLoadingRejected: !error && !data,
//     isErrorRejected: error
//   }
// }


// const loansDisbursedData = () => {
//   // const router = useRouter()

//   const url = `${process.env.BACKEND_URL}/api/loans/by_status/paid`

//   // const token = isAuthenticated().authToken

//   const { data, error } = useSWR([url], fetcher, { shouldRetryOnError: false })

//   return {
//     loansDisbursed: data,
//     isLoadingDisbursed: !error && !data,
//     isErrorDisbursed: error
//   }
// }


// const totalLoansData = () => {
//   // const router = useRouter()

//   const url = `${process.env.BACKEND_URL}/api/loans`

//   // const token = isAuthenticated().authToken

//   const { data, error } = useSWR([url], fetcher, { shouldRetryOnError: false })

//   return {
//     totalLoans: data,
//     isLoadingTotal: !error && !data,
//     isErrorTotal: error
//   }
// }


const usersData = () => {
  // const router = useRouter()

  const url = `${process.env.BACKEND_URL}/api/users`

  // const token = isAuthenticated().authToken

  const { data, error } = useSWR([url], fetcher, { shouldRetryOnError: false })

  return {
    users: data,
    isLoadingUsers: !error && !data,
    isErrorUsers: error
  }
}



export function FetchData() {
  // const [{ dashboardDatas }, dispatch] = useStateValue();
  // console.log(dashboardDatas)

  // const { employees, isError, isLoading } = employeesData()
  // const { messages, isLoadingMessages, isErrorMessages } = messagesData()
  // const { admins, isLoadingAdmins, isErrorAdmins } = adminsData()
  // const { loansDisbursed, isLoadingDisbursed, isErrorDisbursed } = loansDisbursedData()
  // const { loansRejected, isLoadingRejected, isErrorRejected } = loansRejectedData()
  // const { totalLoans, isLoadingTotal, isErrorTotal } = totalLoansData()
  const { users, isLoadingUsers, isErrorUsers } = usersData()

  return {
    // adminsCount: isErrorAdmins ? '' : isLoadingAdmins ? '' : admins && admins.data.length,
    // messagesCount: isErrorMessages ? '' : isLoadingMessages ? '' : messages && messages.data.length,
    // employeesCount: isError ? '' : isLoading ? '' : employees && employees.data.length,
    // loansDisbursedCount: isErrorDisbursed ? '' : isLoadingDisbursed ? '' : loansDisbursed && loansDisbursed.data.length,
    // loansRejectedCount: isErrorRejected ? '' : isLoadingRejected ? '' : loansRejected && loansRejected.data.length,
    // totalLoansCount: isErrorTotal ? '' : isLoadingTotal ? '' : totalLoans && totalLoans.data.data.length,
    usersCount: isErrorUsers ? '' : isLoadingUsers ? '' : users && users.data.data.length,
  }
}