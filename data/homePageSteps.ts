import {Step} from "@/types/Step";

import {TfiWrite} from "react-icons/tfi";
import {AiOutlineSearch} from "react-icons/ai";
import {GrSchedules} from "react-icons/gr";

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
        icon: GrSchedules,
        title: "Build Schedule",
        description: "Build your schedule with the courses you want."
    }
]

export default homePageSteps