import { Button } from "@chakra-ui/react"

export default function ScrollButton(props) {
    return (
        <>
            <Button onClick={props.scrollToQuestionnaire}>
                Jump to questionnaire
            </Button>
        </>
    )
}