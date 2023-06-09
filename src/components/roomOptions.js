import { PRIMARY_WHITE } from "@/lib/globals";
import { 
    Card, 
    CardBody,
    Image,
    Stack,
    Heading,
    Text,
} from "@chakra-ui/react";

export default function RoomOptions(props) {
    return (
        <>
            <Card variant={"elevated"}>
                <CardBody maxW={"md"}
                          display={"flex"} 
                          flexDirection={"column"} 
                          gap={"36px"}
                          borderRadius={"9px"}
                          background={ PRIMARY_WHITE }>
                    <Image src={props.image}
                           borderRadius={"9px"}
                           alt="Picture of Room" />
                    <Stack direction={"column"} 
                           textAlign={"left"}>
                        <Heading as={"h6"} 
                                 size={"md"}>
                            {props.roomName}
                        </Heading>
                        <Text>Category: <b>{props.category}</b></Text>
                        <Text>Max occupancy: {props.maxOccupancy}</Text>
                        <Text>Adults: {props.adults}</Text>
                        <Text>Kids: {props.kids}</Text>
                        <b>
                            <Stack direction={"row"} spacing={1}>
                                    <Text>Estimated price:</Text>
                                    <Text color={"#2e4082"}>
                                        {props.estimatedAllIncludedPrice}
                                    </Text>
                            </Stack>
                        </b>
                    </Stack>
                </CardBody>
            </Card>
        </>
    )
}