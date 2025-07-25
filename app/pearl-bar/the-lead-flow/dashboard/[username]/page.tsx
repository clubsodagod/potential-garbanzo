import { UsernameRouteParams } from "@/_library/types-interfaces-classes/route";
import { getAllUsersDynamicParams } from "@/_utility/fetchers/user/get-all-users-dynamic-params.fetcher";
import { generateUserParams } from "@/_utility/helpers/generate-user-params.helper";
import DashboardRoleRouterModule from "../_components/DashboardRoleRouterModule";
import { pickProperties } from "@/_utility/helpers/property-selecter.helper";
import { getUserByUsername } from "@/_utility/fetchers/user/get-user-by-username.fetcher";


/**
 * Generate all static paths
 */
export async function generateStaticParams() {
    const users = await getAllUsersDynamicParams();

    return generateUserParams(users);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function UserProfilePage({ params }:any) {
    console.log(await params);
    const { username, } = params;

    const user = await getUserByUsername(username);
    
    if (!user) {
        return
    }

    const data = pickProperties(user, ["_id"]);



    return (
        <DashboardRoleRouterModule
            userId={`${data._id}`}
            username={username}
        />
    );
}
