import { GlobalStyles, mode } from "@chakra-ui/theme-tools"

const styles : GlobalStyles = {
    global: (props) => ({
        body: {
            bg: mode("blackAlpha.50", "blackAlpha.700")(props),
        },
        p: {
            color: mode("black", "white")(props),
        }
    }),
}

export default styles