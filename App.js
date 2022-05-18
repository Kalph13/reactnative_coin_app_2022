import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from 'react-query';

/* React Native Firebase Install: https://rnfirebase.io (Use Git Bash for SHA1 ) */
/* React Native Firebase Authentication: https://rnfirebase.io/auth/usage */
/* Firebase Console: https://console.firebase.google.com/ */
import auth from '@react-native-firebase/auth';

import InNav from './navigators/InNav';
import OutNav from './navigators/OutNav';

const queryClient = new QueryClient();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    /* Firebase: Check Log-in */
    auth().onAuthStateChanged(user => {
      user ? setIsLoggedIn(true) : setIsLoggedIn(false);
    });
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        {isLoggedIn ? <InNav /> : <OutNav />}
      </NavigationContainer>
    </QueryClientProvider>
  );
}