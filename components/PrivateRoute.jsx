import React from 'react';
import { useRouter } from 'next/router'

import { isAuthenticated } from './../lib/auth.helper'

/**
 * Check user authentication and authorization
 * It depends on you and your auth service provider.
 * @returns {{auth: null}}
 */
// const checkUserAuthentication = () => {
//   return { auth: null }; // change null to { isAdmin: true } for test it.
// };

export default function WrappedComponent() {
  const router = useRouter();
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />;

  hocComponent.getInitialProps = async (context) => {
    const userAuth = await isAuthenticated();

    // Are you an authorized user or not?
    if (!userAuth?.token) {
      // Handle server-side and client-side rendering.
      if (context.res) {
        context.res?.writeHead(302, {
          Location: '/',
        });
        context.res?.end();
      } else {
        router.replace('/');
      }
    } else if (WrappedComponent.getInitialProps) {
      const wrappedProps = await WrappedComponent.getInitialProps({ ...context, auth: userAuth });
      return { ...wrappedProps, userAuth };
    }

    return { userAuth };
  };

  return hocComponent;
};


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
