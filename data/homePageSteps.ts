import {Step} from "@/types/Step";

import {TfiWrite} from "react-icons/tfi";
import {AiFillCalendar, AiOutlineSearch} from "react-icons/ai";

const homePageSteps: Step[] = [
    {
        icon: TfiWrite,
        title: "Write Review",
        description: "Share your experience with the community."
    },
    {
        icon: AiOutlineSearch,
        title: "Explore Courses",
        description: "Find the best courses for you."
    },
    {
        icon: AiFillCalendar,
        title: "Build Schedule",
        description: "Build your schedule with the courses you want."
    }
]

export default homePageSteps