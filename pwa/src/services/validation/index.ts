export function getMatchingPart(input: string): string | undefined {
    const regEx = /[A-Z]?[0-9]{3,4}(\.[0-9])?/g;
    if (!regEx.test(input)) return;
    let matches = input.match(regEx);
    const firstMatch = matches?.[0];
    if (!firstMatch) return;
    if (/^([A-Z]|[a-z])/.test(firstMatch)) return firstMatch.toUpperCase();
    return `S${firstMatch}`;
}

export function isRoomNumberValid(input: string): boolean {
    const regEx = /^[A-Z]?[0-9]{3,4}(\.[0-9])?$/g;
    return regEx.test(input);
}
