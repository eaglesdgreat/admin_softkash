import React from 'react';
import { useRouter } from 'next/router'

import { isAuthenticated } from './../lib/auth.helper'




const withAuth = (Component) => {
    const router = useRouter();
    const authCheck = isAuthenticated()
  
    const Auth = (props = authCheck) => {
      // Login data added to props via redux-store (or use react context for example)
      const { token } = props;
  
      // If user is not logged in, return login component
      if (!token && !props) {
        router.replace('/')
        // return (
        //   <Login />
        // );
      }
  
      // If user is logged in, return original component
      return (
        <Component {...props} />
      );
    };
  
    // Copy getInitial props so it will run as well
    if (Component.getInitialProps) {
      Auth.getInitialProps = Component.getInitialProps;
    }
  
    return Auth;
  };
  
  export default withAuth;
  