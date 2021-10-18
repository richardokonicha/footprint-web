import React from "react";
import { ChakraProvider } from "@chakra-ui/react"
// import { auth } from '../services/firebaseClient'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from "firebase/auth";

import UserContext from "../context/UserContext"
import Landing from "../pages/Landing"
import { Progress } from "@chakra-ui/react"
import theme from '../theme'

const MainLayout: React.FC = ({ children }) => {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth)
  return (
    <ChakraProvider theme={theme}>
      {loading ? (<Progress hasStripe isAnimated colorScheme="green" size="sm" value={100} />) : (null)}
      {user ? (
        <div>
          <UserContext.Provider value={user}>
            {children}
          </UserContext.Provider>
        </div>
      ) : (<Landing />)
      }
    </ChakraProvider>
  )
}
export default MainLayout
