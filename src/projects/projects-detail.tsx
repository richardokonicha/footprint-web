import { useParams } from "react-router-dom";
import { useFirestore, useFirestoreDocData } from 'reactfire';
import { doc, enableIndexedDbPersistence, increment, updateDoc, orderBy, query, addDoc } from 'firebase/firestore';
import { Box, Progress, Container, HStack, Text, Tag, Switch, Spacer, useToast, Button } from "@chakra-ui/react";
import ProjectConfig from "../components/project-config";
import { useSetConfigVarsMutation, useSetFormationMutation } from '../services/api'
import { TELE_HASH, TELE_ID, REDISTOGO_URL, SESSION } from '../services/axiosBaseQuery';


function ProjectDetail() {
    const { projectId } = useParams<{ projectId: string }>()
    const firestore = useFirestore();
    const ref = doc(firestore, 'projects', projectId);
    const { status, data } = useFirestoreDocData(ref);

    const [setConfigVars, { isLoading: isSetConfigVars }] = useSetConfigVarsMutation()
    const [setFormation, { isLoading: isSetFormation }] = useSetFormationMutation()

    console.log(data)


    const turnOn = async (e: any, name: string) => {
        console.log(data, e.target.checked)
        if (e.target.checked) {
            const formation_data = {
                "updates": [
                    {
                        "quantity": 1,
                        // "size": "standard-1X",
                        "type": "worker"
                    }
                ]
            }
            await setFormation({ name, formation_data }).unwrap()
                .then((payload: any) => {
                    updateDoc(ref, {
                        "did": "worked",
                        ...payload,
                    })

                    console.log(payload)
                })
                .catch((error: any) => { console.log(error) })
        } else {
            const formation_data = {
                "updates": [
                    {
                        "quantity": 0,
                        "type": "worker"
                    }
                ]
            }
            await setFormation({ name, formation_data }).unwrap()
                .then((payload: any) => { console.log(payload) })
                .catch((error: any) => { console.log(error) })
        }


    }


    const configure = async () => {
        const configVars = {
            "API_HASH": TELE_HASH,
            "API_ID": TELE_ID,
            "CHATINPUT": -1001313782946,
            "CHATOUTPUT": -1001313782946,
            "REDISTOGO_URL": REDISTOGO_URL,
            "SESSION": SESSION,
        }

        setConfigVars({ name: data.name, config_vars: configVars })
            .unwrap()
            .then((payload) => {
                updateDoc(ref, {
                    "dihd": "worked",
                    ...payload,
                })

                console.log(payload)
            })
            .catch((error) => { console.log(error) })
    }


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
                        <Switch id="turn on" onChange={(value) => turnOn(value, data.name)} />
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

            <Button variant="outline" size="lg" mt={4} onClick={configure}>configure</Button>

            {/* <ProjectConfig /> */}
        </Container >
    )
}

export default ProjectDetail