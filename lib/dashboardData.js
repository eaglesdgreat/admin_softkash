import useSWR, { mutate } from 'swr'
import { useRouter } from 'next/router'
import axios from 'axios'


export default function FetchData() {
  const fetcher = async (...arg) => {
    // const [url, token] = arg
    const [url] = arg
  
    const response = await axios.get(
      url,
      // { headers: { authenticate: token } }
    )
  
    return response.data
  }

  const employeesData = () => {
    // const router = useRouter()
  
    const url = `${process.env.BACKEND_URL}/api/employers`
  
    // const token = isAuthenticated().authToken
  
    const { data, error } = useSWR([url], fetcher, { shouldRetryOnError: false })
  
    return {
      employees: data,
      isLoading: !error && !data,
      isError: error
    }
  }

  const messagesData = () => {
    // const router = useRouter()
  
    const url = `${process.env.BACKEND_URL}/api/contacts`
  
    // const token = isAuthenticated().authToken
  
    const { data, error } = useSWR([url], fetcher, { shouldRetryOnError: false })
  
    return {
      messages: data,
      isLoading: !error && !data,
      isError: error
    }
  }

  const adminsData = () => {
    // const router = useRouter()
  
    const url = `${process.env.BACKEND_URL}/api/admins`
  
    // const token = isAuthenticated().authToken
  
    const { data, error } = useSWR([url], fetcher, { shouldRetryOnError: false })
  
    return {
      admins: data,
      isLoading: !error && !data,
      isError: error
    }
  }
}