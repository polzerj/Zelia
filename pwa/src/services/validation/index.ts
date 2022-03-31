export function getMatchingPart(input: string): string | undefined {
    //input = input./* replace(/\s/g, "") .*/ replace(/,/g, ".");
    const regEx = /[[A-Z]{0,4} {0,2}[0-9]{4}((\.|,) {0,2}[0-9])?/g;
    if (!regEx.test(input)) return;
    let matches = input.match(regEx);
    let firstMatch = matches?.[0].toUpperCase().replaceAll(" ", "");
    if (!firstMatch) return;
    if (firstMatch.includes("EDV")) {
        firstMatch = firstMatch.replace("EDV", "S");
    }
    let match = /^[A-Z]/.test(firstMatch) ? firstMatch : `S${firstMatch}`;
    /* if (match.length === 6) {
        match = match.slice(0, 4) + "." + match.slice(5);
    } */
    return match;
}

export function isRoomNumberValid(input: string): boolean {
    const regEx = /^[A-Z]?[0-9]{4}(\.[0-9])?$/g;
    return regEx.test(input);
}
