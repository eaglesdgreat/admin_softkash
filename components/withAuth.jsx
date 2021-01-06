import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

import { isAuthenticated } from './../lib/auth.helper'

const AuthContext = createContext()

function AuthProvider({ children }) {
  const { pathname, events } = useRouter()
  const url = `${process.env.BACKEND_URL}/api/admins/${isAuthenticated().id}`

  const [user, setUser] = useState()

  // get the user profile, if it exists, from our API route
  async function getUser() {
    if (pathname !== '/') {
      try {
        const response = await axios.get(
          url,
          // { headers: { authenticate: token } }
        )

        const profile = await response.data.data
        // console.log(profile)

        // condition if the user does not exist
        if (!profile) {
          setUser(null)
        } else {
          setUser(profile)
        }
      } catch (err) {
        console.error(err)
      }
    } else {
      setUser(null)
    }
  }

  // We check if the user’s authenticated with every route change
  useEffect(() => {
    getUser()
  }, [pathname])

  // This check if the user is not authenticated or authorized to access a route and redirect them back to the login page
  useEffect(() => {
    // Check that a new route is OK
    const handleRouteChange = url => {
      if (url !== '/' && (!user || user === null) && !isAuthenticated().token) {
        window.location.href = '/'
        // router.replace('/')
      }
    }

    // Check that initial route is OK
    if (pathname !== '/' && (!user || user === null) && !isAuthenticated().token) {
      window.location.href = '/'
      // router.replace('/')
    }

    // Monitor routes
    events.on('routeChangeStart', handleRouteChange)
    return () => {
      events.off('routeChangeStart', handleRouteChange)
    }
  }, [user])

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}

// const ProtectRoute = ({ children }) => {
//   // const router = useRouter()

//   const { authenticate, user } = useAuth();

//   if ((!user || user === null) && (!authenticate && window.location.pathname !== '/')){
//     window.location.href = '/'
//     // router.replace('/') 
//   }
//   return children;
// };

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
