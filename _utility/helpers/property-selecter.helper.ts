/**
 * pickProperties
 *
 * Returns a new object containing only the specified keys from the original object.
 *
 * @template T - The source object type
 * @template K - Keys of T to pick
 * @param {T} obj - The source object
 * @param {K[]} keys - Array of keys to include in the returned object
 * @returns {Pick<T, K>} New object with only selected properties
 *
 * @example
 * const user = { id: 1, name: 'Alice', email: 'alice@example.com' };
 * const result = pickProperties(user, ['id', 'name']);
 * // result => { id: 1, name: 'Alice' }
 */
export function pickProperties<T extends object, K extends keyof T>(
    obj: T,
    keys: K[]
): Pick<T, K> {
    return keys.reduce((acc, key) => {
        if (key in obj) {
            acc[key] = obj[key];
        }
        return acc;
    }, {} as Pick<T, K>);
}
