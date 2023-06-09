import { PRIMARY_COLOR } from "@/lib/globals"
import { Button } from "@chakra-ui/react"

export default function ScrollButton(props) {
    return (
        <>
            <Button color={ PRIMARY_COLOR } borderColor={ PRIMARY_COLOR } variant={"outline"} onClick={props.scrollToQuestionnaire}>
                Jump to questionnaire
            </Button>
        </>
    )
}