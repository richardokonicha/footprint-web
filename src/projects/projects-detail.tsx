import { useParams } from "react-router-dom";
import { useFirestore, useFirestoreDocData } from 'reactfire';
import { doc, enableIndexedDbPersistence, increment, updateDoc, orderBy, query, addDoc } from 'firebase/firestore';
import { Box, Progress, Container, HStack, Text, Tag, Switch, Spacer, useToast } from "@chakra-ui/react";

function ProjectDetail() {
    const { projectId } = useParams<{ projectId: string }>()
    const firestore = useFirestore();
    const ref = doc(firestore, 'projects', projectId);
    const { status, data } = useFirestoreDocData(ref);

    return (
        <Container maxW="container.xl" pt={4}>
            {status === "loading" && (
                <Progress isIndeterminate={status === 'loading'} isAnimated />
            )}
            {status === "success" && (
                <Box shadow="md" p={4}>
                    <HStack>
                        <Text textTransform="capitalize" >{data?.name}</Text>
                        <Tag size='sm' variant="solid" colorScheme="blueprint">
                            Live
                        </Tag>
                        <Switch id="turn on" />
                        <Spacer />
                        <Tag size='sm' variant="solid" colorScheme="teal">
                            Healthy
                        </Tag>
                    </HStack>
                    <Text>{data?.heroku_alias || "footprint"}</Text>
                    <Text textTransform="capitalize">{data?.description}</Text>

                </Box>
            )
            }
        </Container >
    )
}

export default ProjectDetail