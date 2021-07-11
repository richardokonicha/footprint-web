import { extendTheme } from "@chakra-ui/react"
import { ChakraProvider } from "@chakra-ui/react"
import { auth } from '../services/firebaseClient'
import { useAuthState } from 'react-firebase-hooks/auth'
import UserContext from "../context/UserContext"
import Landing from "../pages/Landing"
import { Progress } from "@chakra-ui/react"

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
}
const theme = extendTheme({ colors })

const MainLayout = ({ children }) => {
  const [user, loading, error] = useAuthState(auth)
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
