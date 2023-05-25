import { useAuth } from '@hooks/useAuth';

import { useEffect } from 'react';

export const SignOut = () => {
  const { signOut } = useAuth();

  useEffect(() => {
    signOut();
  }, []);

  return null;
};
