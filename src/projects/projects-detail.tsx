import { useParams } from "react-router-dom";
import { useFirestore, useFirestoreDocData } from 'reactfire';
import { doc, enableIndexedDbPersistence, increment, updateDoc, orderBy, query, addDoc } from 'firebase/firestore';
import { Box, Progress, Container } from "@chakra-ui/react";

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
                <Box>{data?.description}</Box>
            )}
        </Container>
    )
}

export default ProjectDetail