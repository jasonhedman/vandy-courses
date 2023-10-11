import { cardAnatomy } from '@chakra-ui/anatomy'
import { mode } from "@chakra-ui/theme-tools";
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(cardAnatomy.keys)

const baseStyle = definePartsStyle((props) => ({
    container: {
        backgroundColor: mode("white", "whiteAlpha.50")(props),
        p: 4,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        position: "relative",
        minWidth: "0px",
        wordWrap: "break-word",
        backgroundClip: "border-box",
        rounded:'lg',
        shadow: 'xl'
    },
    header: {},
    body: {},
    footer: {},
}))

const sizes = {}

const Card = defineMultiStyleConfig({ baseStyle, sizes })

export default Card