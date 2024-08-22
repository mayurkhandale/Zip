import { useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

function usePreviousPathname() {
  const location = useLocation();
  const [previousPathname, setPreviousPathname] = useState(null);
  const locationRef = useRef(location);

  useEffect(() => {
    if (locationRef.current.pathname !== location.pathname) {
      setPreviousPathname(locationRef.current.pathname);
      locationRef.current = location;
    }
  }, [location]);

  return previousPathname;
}

export default usePreviousPathname;