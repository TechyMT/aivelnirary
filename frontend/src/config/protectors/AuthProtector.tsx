'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { toast } from 'sonner';

/**
 * A Higher Order Component (HOC) that protects a route by checking if the user is authenticated.
 * If the user is not authenticated, they are redirected to the access denied page.
 *
 * This HOC is used to protect routes that require the user to be authenticated.
 *
 * @template {object} P
 * @param {React.ComponentType<P>} WrappedComponent
 * @returns {(props: P) => JSX.Element}
 *
 * @example
 * import AuthProtector from "@/config/routes/AuthProtector";
 *
 * const MyProtectedComponent = () => {
 *    return <div>Protected Component</div>;
 * };
 *
 * export default AuthProtector(MyProtectedComponent);
 */
const AuthProtector = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> => {
  const ProtectedComponent: React.FC<P> = (props: P) => {
    const router = useRouter();
    const { data: session, status } = useSession();
    const pathname = usePathname();

    useEffect(() => {
      if (status === 'loading') {
        return;
      }
      if (
        status === 'unauthenticated' &&
        (pathname === '/onboarding' ||
          pathname === '/create-itinerary' ||
          pathname === '/profile')
      ) {
        // User is not authenticated, redirect to access denied page
        toast.error('Access Denied', {
          description: 'You need to be logged in to access this page.',
        });
        return router.replace('/');
      }

      if (
        status === 'authenticated' &&
        session.user.profile_completed === false
      ) {
        toast.info('Profile Incomplete', {
          description: 'Please complete your profile to continue.',
        });
        return router.replace('/onboarding');
      }

      if (
        status === 'authenticated' &&
        session.user.profile_completed === true &&
        pathname === '/onboarding'
      ) {
        toast.success('Profile Complete', {
          description: 'You have successfully completed your profile.',
        });
        return router.replace('/');
      }
    }, [status, session, router, pathname]);

    return <WrappedComponent {...props} />;
  };

  return ProtectedComponent;
};

export default AuthProtector;
