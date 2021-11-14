import { useParams } from "react-router-dom";
import { useFirestore, useFirestoreDocData } from 'reactfire';
import { doc, enableIndexedDbPersistence, increment, updateDoc, orderBy, query, addDoc } from 'firebase/firestore';
import { Box, Progress, Container, HStack, Text, Tag, Switch, Spacer, useToast, Button } from "@chakra-ui/react";
import ProjectConfig from "../components/project-config";
import { useSetConfigVarsMutation, useSetFormationMutation, useGetAppFormationQuery } from '../services/api'
import { TELE_HASH, TELE_ID, REDISTOGO_URL, SESSION } from '../services/axiosBase';
import { Avatar, AvatarBadge, AvatarGroup, TagLabel,Divider, VStack } from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons";

function ProjectDetail() {
    const { projectId } = useParams<{ projectId: string }>()
    const firestore = useFirestore();
    const ref = doc(firestore, 'projects', projectId);
    const { status, data } = useFirestoreDocData(ref);

    const [setConfigVars, { isLoading: isSetConfigVars }] = useSetConfigVarsMutation()
    const [setFormation, { isLoading: isSetFormation }] = useSetFormationMutation()

    const { data: appData, error, isLoading: isLoadingAppData } = useGetAppFormationQuery(data?.name)


    const turnOn = async (e: any, name: string) => {
        console.log(data, e.target.checked)
        if (e.target.checked) {
            const formation_data = {
                "updates": [
                    {
                        "quantity": 1,
                        "type": "worker"
                    }
                ]
            }
            await setFormation({ name, formation_data }).unwrap()
                .then((payload: any) => {
                    console.log(payload, "oooo")
                    updateDoc(ref, {
                        "did": "worked",
                        ...payload,
                    })

                    // console.log(payload)
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
        <Container maxW="container.xl" pt={8}>
            {status === "loading" && (
                <Progress isIndeterminate={status === 'loading'} isAnimated />
            )}
            {status === "success" && (
                <Box >
                    <HStack spacing={4} mb={4} >
                        <Text fontSize="xl" textTransform="capitalize" >{data?.name}</Text>

                        <Switch id="turn on" size='md' onChange={(value) => turnOn(value, data.name)} isChecked={appData?.quantity > 0} />
                        <Tag size='md' variant="solid" colorScheme={appData?.quantity > 0 ? "blue" : "red"} px={4}>
                            {appData?.quantity > 0 ? "Active" : "Dead"}
                        </Tag>
                        <Spacer />
                        <Tag size='md' variant="solid" colorScheme="blue">
                            Authorize Telegram
                        </Tag>
                    </HStack>
                    <Text fontSize="sm" mb={2} color="gray.400" textTransform="capitalize" >{data?.description}</Text>

                    <Box minH={32} flexGrow={1} bg="gray.200" borderRadius={4} p={4} mb={8}>
                        Loading...
                    </Box>
                    <Divider mb={8}/>

                    <HStack mb={6} > 
                    <Button variant="solid" size="lg" leftIcon={<AddIcon />}  onClick={configure}>Source</Button>
                    <Spacer/>
                    <Button variant="solid" size="lg" leftIcon={<AddIcon />} onClick={configure}>Destination</Button>
                    </HStack>
                    <HStack spacing={4} >
                        <Box>
                        <Tag size="lg" colorScheme="gray" borderRadius="full" p={2}>
                        <Avatar name="Dan Abrahmov"  size="lg"   ml={-1}
                                mr={2} src="https://bit.ly/dan-abramov" />
                        <TagLabel>Dan Abrahmov</TagLabel>
                        </Tag>
                        </Box>
                    <Spacer />

                    <VStack>

                    
                    <Tag size="lg" colorScheme="gray" borderRadius="full"  p={2}>
                    <Avatar name="Dan Abrahmov" size="lg" ml={-1} mr={2} src="https://bit.ly/dan-abramov" />
                        <TagLabel mr={2}>Dan Abrahmov</TagLabel>
                        </Tag>
                    </VStack>
                    </HStack>
                    {/* <Text>{data?.heroku_alias || "footprint"}</Text> */}
                </Box>
            )
            }

            {/* <ProjectConfig /> */}
        </Container >
    )
}

export default ProjectDetail