import isAdmin from "@/data/admins";

import {Route} from "@/types/Route";


const baseRoutes: Route[] = [
    {
        href: '/',
        text: 'Explore'
    },
    {
        href: '/courses',
        text: 'Courses'
    },
    {
        href: '/profile',
        text: 'Profile'
    },
]
const routes = (userId: string | null | undefined): Route[] => {
    if(!userId) return [];
    if(isAdmin(userId)) {
        return baseRoutes.concat({
            href: '/admin',
            text: 'Admin'
        });
    } else {
        return baseRoutes;
    }
}

export default routes