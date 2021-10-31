import { Box, Flex, Modal, useToast, ModalContent, ModalFooter, ModalCloseButton, ModalBody, ModalOverlay, IconButton, useDisclosure, Center, Spacer, Tag, Text, HStack, Progress, ModalHeader, Button, Input } from '@chakra-ui/react';
import { collection, addDoc, doc } from "firebase/firestore";
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import { AddIcon } from '@chakra-ui/icons'
import { Formik } from 'formik'
import {
    Link,
    useParams
} from "react-router-dom";
import { useCreateAppMutation } from '../services/api'



function Projects() {
    const toast = useToast()
    const firestore = useFirestore()
    const { isOpen, onOpen: onOpenNew, onClose } = useDisclosure()
    const projectRef = collection(firestore, 'projects')
    const { status, data: value, error } = useFirestoreCollectionData(projectRef)

    const [createApp, { isLoading: isCreateApp }] = useCreateAppMutation()

    const addProject = ({ name, description }: { name: string, description: string }) => {
        const data = {
            "name": name,
            "stack": "cedar"
        }
        createApp(data)
            .then((payload) => {
                console.log(payload)
                addDoc(projectRef, {
                    name: name,
                    description: description,
                    ...payload
                })
                    .then((p) => {
                        toast({
                            title: "service created.",
                            description: `${name} created`,
                            status: "success",
                            duration: 2000,
                            isClosable: true,
                        })
                    })
            })

        onClose()
    }
    return (
        <Box>
            {error && <strong>Error: {JSON.stringify(error)}</strong>}
            <Progress isIndeterminate={status === 'loading'} isAnimated />
            {status === "success" && (
                <Flex mt={8} p={4} key={doc.name} flexWrap='wrap'>
                    {value.map((doc, index) => (

                        <Link to={`/projects/${doc.NO_ID_FIELD}`} key={index}>
                            <Box

                                boxShadow="md"
                                flexGrow={1}
                                minW={64}
                                m={4}
                                p={6}
                                rounded="xs"
                                bg="#F8F8F8"
                                _hover={{
                                    background: "white",
                                    color: "teal.500",
                                }}>
                                <HStack mb={14}>
                                    <Text fontSize="md" textTransform="capitalize">{doc.name}</Text>
                                    <Spacer />

                                    <Tag size='sm' variant="solid" colorScheme="blueprint">
                                        Live
                                    </Tag>
                                </HStack>
                                <Spacer />

                                <Text mb={1} fontSize="xs">{doc.heroku_alias}</Text>
                                <Text color="gray.500" fontSize="xs">Created on 6/6/78</Text>
                            </Box>
                        </Link>

                    ))}
                    <Center boxShadow="md" m={4} rounded="sm" bg="#F8F8F8" >
                        <IconButton onClick={onOpenNew} fontSize={24} p={8} w={24} minW={64} height="100%" colorScheme="gray" aria-label="create new" icon={<AddIcon />} />

                    </Center>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <Formik
                            initialValues={{ name: '', description: '' }}
                            onSubmit={(values, { setSubmitting }) => {
                                addProject(values)
                                setSubmitting(false);
                            }}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                isSubmitting,
                            }) => (
                                <form onSubmit={handleSubmit}>
                                    <ModalContent>
                                        <ModalHeader>Create new service</ModalHeader>
                                        <ModalCloseButton />
                                        <ModalBody>
                                            <Box>
                                                <Input type="text"
                                                    name="name"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.name}
                                                    placeholder="Name" mb={4} />
                                                {errors.name && touched.name && errors.name}
                                                <Input type="text"
                                                    name="description"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.description}
                                                    placeholder="description" />
                                                {errors.description && touched.description && errors.description}
                                            </Box>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button onClick={onClose} variant="ghost">Close</Button>
                                            <Button type="submit" disabled={isSubmitting} colorScheme="blue" mr={3} >
                                                Create
                                            </Button>
                                        </ModalFooter>
                                    </ModalContent>
                                </form>
                            )}
                        </Formik>
                    </Modal>
                </Flex>
            )
            }
        </Box >

    )
}

export default Projects