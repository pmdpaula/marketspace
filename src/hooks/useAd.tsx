import { AdContext } from '@contexts/AdContext';

import { useContext } from 'react';

export const useAd = () => {
  const context = useContext(AdContext);

  return context;
};
