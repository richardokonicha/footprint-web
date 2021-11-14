import React from "react";
import { ChakraProvider, Flex, Box} from "@chakra-ui/react"
// import { auth } from '../services/firebaseClient'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuth } from "firebase/auth";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../components/routes.js";
import UserContext from "../context/UserContext"
import Landing from "../pages/Landing"
import { Progress } from "@chakra-ui/react"
import theme from '../theme/theme'

const MainLayout: React.FC = ({ children }) => {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth)
  return (
    <ChakraProvider theme={theme} >
      {loading ? (<Progress hasStripe isAnimated colorScheme="green" size="sm" value={100} />) : (null)}
      {user ? (
  
        <UserContext.Provider value={user}>
          {children}
      </UserContext.Provider>
      ) : (<Landing />)
      }
    </ChakraProvider>
  )
}
export default MainLayout
