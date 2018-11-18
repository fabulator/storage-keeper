/**
 * Try to parse json.
 *
 * @param json - Possible encoded json
 * @returns Decoded json or source string
 */
export default function tryParseJson(json: string): Object | string {
    try {
        return JSON.parse(json);
    } catch (exception) {
        return json;
    }
}
