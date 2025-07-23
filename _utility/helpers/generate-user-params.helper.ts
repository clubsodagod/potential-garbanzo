/**
 * Creates route param objects for [username] pages.
 *
 * @param users - Array of users with username and id.
 * @returns {Array<{ username: string }>} - Route param structure.
 */
export function generateUserParams(users: Array<{ username: string; id: string }>): Array<{ username: string }> {
    return users.map((user) => ({
        username: user.username,
        id:`${user.id}`,
    }));
}
