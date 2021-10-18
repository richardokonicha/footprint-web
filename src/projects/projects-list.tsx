import { Box, Flex, Heading, Tag, Text, HStack } from '@chakra-ui/react';
import { firestore } from '../services/firebaseClient'
import { collection, addDoc, getDocs, doc } from "firebase/firestore";
import { useFirestoreDocData, useFirestore, useFirebaseApp, useFirestoreCollectionData } from 'reactfire';


function Projects() {
    const projectRef = collection(useFirestore(), 'projects');
    const { status, data: value } = useFirestoreCollectionData(projectRef);

    // const addProject = () => {
    //     addDoc(db.collection('projects'), {
    //         name: 'New Project',
    //         description: 'New Project Description',
    //     })
    // }

    // Add a new document with a generated id.
    // const docRef = await addDoc(collection(db, "cities"), {
    //     name: "Tokyo",
    //     country: "Japan"
    // });
    // console.log("Document written with ID: ", docRef.id);

    return (

        <Box>
            {/* {error && <strong>Error: {JSON.stringify(error)}</strong>} */}
            {/* {loading && <span>Collection: Loading...</span>} */}
            {value && (
                <span>
                    Collection:{' '}
                    {value.map((doc) => (
                        <Flex mt={8} p={4} key={doc.name}>

                            <Box boxShadow="md" p="6" rounded="md" bg="#F8F8F8">
                                <HStack>
                                    <Heading>{doc.name}</Heading>
                                    <Tag size='md' variant="solid" colorScheme="blueprint">
                                        Live
                                    </Tag>
                                </HStack>

                                <Text>{doc.heroku_alias}</Text>
                                <Text>Created on 6/6/78</Text>
                            </Box>
                        </Flex>
                    ))}
                </span>
            )}

        </Box >

    )
}

export default Projects