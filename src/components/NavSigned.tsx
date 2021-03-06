import { AddIcon, CloseIcon, HamburgerIcon } from '@chakra-ui/icons'
import {
    Avatar, Box, Button, Flex, HStack, IconButton, Link, Menu, Spacer,
    MenuButton, MenuDivider, MenuItem, MenuList, Stack, Text, useColorModeValue, useDisclosure
} from '@chakra-ui/react'
import { ReactNode } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link as LinkRouter } from "react-router-dom"
import { auth, signOutfn } from '../services/firebaseClient'
import logo from './logo1.png'

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

export default function WithAction() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [user] = useAuthState(auth)

    return (
        <>
            <HStack px={[0, 4]} shadow="md" h={14}>
                <IconButton
                    size={'md'}
                    icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                    aria-label={'Open Menu'}
                    display={{ md: 'none' }}
                    onClick={isOpen ? onClose : onOpen}
                />
                <Avatar name="Foot print" src={logo} colorScheme="blackAlpha" size="xs" />
                <Box
                    as={'nav'}
                    display={{ base: 'none', md: 'flex' }}>
                    {Links.map((link) => (
                        <NavLink to={link.route} key={link.id}>{link.name}</NavLink>
                    ))}
                </Box>
                <Spacer />
                <>
                    <Button
                        variant={'solid'}
                        colorScheme={'blueprint'}
                        size={'sm'}
                        mr={4}
                        leftIcon={<AddIcon />}>
                        Create new project
                    </Button>
                    <Menu>
                        <MenuButton
                            as={Button}
                            color={'blueprint'}
                            rounded={'full'}
                            variant={'link'}
                            cursor={'pointer'}>
                            <Avatar
                                size={'sm'}
                                src={user.photoURL}
                            />
                        </MenuButton>
                        <MenuList>
                            <MenuItem>Link 1</MenuItem>
                            <MenuItem>Link 2</MenuItem>
                            <MenuDivider />
                            <MenuItem onClick={signOutfn}>Sign out<Text fontSize="xs" p={2}>({user.displayName})</Text></MenuItem>
                        </MenuList>
                    </Menu>
                </>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            {Links.map((link) => (
                                <NavLink to={link.route} key={link.id}>{link.name}</NavLink>
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </HStack>
        </>
    )
}