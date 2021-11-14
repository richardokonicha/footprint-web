import { Box, ListItem, List, Link, ListIcon, Divider , useColorModeValue} from '@chakra-ui/react'
import { MdCheckCircle, MdSettings } from 'react-icons/md'
import { Link as LinkRouter } from "react-router-dom"
import { ReactNode } from 'react'


const Links = [
    // { id: 3, name: 'Home', route: '/' },
    { id: 1, name: 'Dashboard', route: '/dashboard' },
    { id: 2, name: 'Projects', route: '/projects' },

]

const NavLink = ({ children, to }: { children: ReactNode; to: string; }) => (
    <Link
        to={to}
        as={LinkRouter}
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}>
        {children}
    </Link>
)

const Sidebar = () => {
    return(
        <Box h={'100vh'} w={72} bgColor="gray.100" pt={14} px={4}>
            <List spacing={3}>
            <Divider />
            <Box
                    as={'nav'}
                    display={{ base: 'none', md: 'flex' }}>
                    {Links.map((link) => (
                        <NavLink to={link.route} key={link.id}>{link.name}</NavLink>
                    ))}
                </Box>
            <ListItem>
                <ListIcon as={MdCheckCircle} color="green.500" />
                ......
            </ListItem>
            <Divider />
            <ListItem>
                <ListIcon as={MdCheckCircle} color="green.500" />
                ......
            </ListItem>
            </List>
        </Box>
    )
}
export default Sidebar;