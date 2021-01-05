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

export default WrappedComponent => {
  const router = useRouter();
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />;

  hocComponent.getInitialProps = async (context) => {
    const userAuth = await isAuthenticated();

    // Are you an authorized user or not?
    if (!userAuth?.toekn) {
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
