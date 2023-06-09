import { rooms } from "@/lib/roomsData";
import RoomOptions from "./roomOptions";
import { SimpleGrid, Heading, Text, Highlight } from "@chakra-ui/react";
import { PRIMARY_COLOR } from "@/lib/globals";

export default function OptionsList() {
    return (
        <>
            <Heading as={"h2"} size={"lg"}>
                Below are some examples of rooms that you could stay in. 
                <br/>
                We included this so you can get an idea of how much you might have to pay.
                <Text marginTop={"18px"} 
                      fontSize={"lg"}>
                    <Highlight query={"these prices may change"} styles={{ px: '1', py: '.5', bg: '#FAFAFA', color: PRIMARY_COLOR }}>
                        Please keep in mind that these prices may change and the example price is how much it costs for three nights with the specific amount of adults and kids displayed in the card.
                    </Highlight>
                </Text>
            </Heading>
            <SimpleGrid templateColumns={["1fr","1fr 1fr 1fr"]} gap={"36px"} padding={"0 36px"}>
                {rooms.map((room, index) => (
                    <RoomOptions roomName={room.roomName}
                                 category={room.category} 
                                 maxOccupancy={room.maxOccupancy} 
                                 adults={room.adults} 
                                 kids={room.kids} 
                                 estimatedAllIncludedPrice={room.estimatedAllIncludedPrice} 
                                 image={room.image} 
                                 key={index} />    
                ))}
            </SimpleGrid>
        </>
    )
}