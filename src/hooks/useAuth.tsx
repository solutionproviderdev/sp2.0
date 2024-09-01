import { useEffect, useState } from 'react';

export default function useAuth() {
  const [loggedIn, setLoggedIn] = useState(true); // Static value for now

  useEffect(() => {
    // Static authentication logic
    setLoggedIn(true); // Assuming the user is always logged in for this example
  }, []);

  return loggedIn;
}
